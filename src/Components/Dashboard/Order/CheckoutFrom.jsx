/* ===================== EMAIL HELPERS (Forge Frame Clothing) ===================== */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

// formats the order email body
function buildOrderEmailMessage({ order, items }) {
  const now = new Date().toLocaleString();

  const itemsBlock =
    items && items.length
      ? items
          .map((it, idx) => {
            const quantity = Number(it.quantity) || 1;
            const unitPrice = Number(it.price) || 0;
            const lineTotal = unitPrice * quantity;
            const size = it.size ? ` | Size: ${it.size}` : "";
            const color = it.color ? ` | Color: ${it.color}` : "";
            return `${idx + 1}. ${it.name}${size}${color} — ${quantity} x $${unitPrice.toFixed(
              2
            )} = $${lineTotal.toFixed(2)}`;
          })
          .join("\n")
      : "No items";

  return `
🧾 NEW ORDER (Stripe) — Forge Frame Clothing

👤 CUSTOMER
Name: ${order.userName || "N/A"}
Email: ${order.userEmail || "N/A"}
Phone: ${order.phone || "N/A"}

📍 SHIPPING ADDRESS
City: ${order.city || "N/A"}
Address: ${order.address || "N/A"}

🛒 ITEMS
${itemsBlock}

💳 PAYMENT
Subtotal: $${Number(order.subtotal || 0).toFixed(2)}
Tax: $${Number(order.tax || 0).toFixed(2)}
Total: $${Number(order.total).toFixed(2)}
Transaction ID: ${order.transactionId || "N/A"}
Status: ${order.status || "pending"}

📅 Placed On: ${now}

──────────────────────────────
🧵 This email was sent via Forge Frame Clothing — Checkout.
  `.trim();
}

// returns a Web3Forms request payload
function buildWeb3FormsBody({ message, customerEmail, customerName }) {
  return {
    access_key: "bd18a29a-fa32-4ba6-a668-9e702ac7cd3f", // TODO: move to env/server in production
    from_name: "Forge Frame Clothing — Order",
    subject: `New Order - ${customerName || customerEmail || "Customer"}`,
    message,
    replyto: customerEmail || "noreply@forgeframe.com",
    emails: `rezoanbids@gmail.com, ${customerEmail || ""}`.trim(),
  };
}

async function sendOrderEmail(web3Body) {
  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(web3Body),
  });
  return resp.json(); // { success: boolean, ... }
}

/* ===================== COMPONENT (rafce) ===================== */

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const [cart, refetch] = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Form states
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Price calculation (uses quantity)
  const subtotal = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return total + price * qty;
    }, 0);
  }, [cart]);

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Create payment intent
  useEffect(() => {
    if (total > 0) {
      axiosSecure.post("/create-payment-intent", { total }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, total]);

  // Clear cart after payment
  const clearCart = async () => {
    try {
      const response = await axiosSecure.delete(`/cart`);
      if (response.data.deletedCount > 0) {
        refetch();
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      Swal.fire("Error!", "Failed to clear cart!", "error");
    }
  };

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErr("");

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "N/A",
            name: user?.displayName || name,
          },
        },
      });

    if (confirmError) {
      setErr(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const orderData = {
        userEmail: user?.email,
        userName: name,
        phone,
        city,
        address,
        subtotal,
        tax,
        total,
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        transactionId: paymentIntent.id,
        status: "pending",
        date: new Date().toISOString(),
      };

      const message = buildOrderEmailMessage({
        order: orderData,
        items: orderData.items,
      });

      const web3formsBody = buildWeb3FormsBody({
        message,
        customerEmail: orderData.userEmail,
        customerName: orderData.userName,
      });

      try {
        const [mailResult, saveResult] = await Promise.allSettled([
          sendOrderEmail(web3formsBody),
          axiosSecure.post("/order", orderData),
        ]);

        const mailOk =
          mailResult.status === "fulfilled" &&
          mailResult.value &&
          mailResult.value.success;

        const saveOk =
          saveResult.status === "fulfilled" &&
          (saveResult.value?.status === 200 ||
            saveResult.value?.status === 201 ||
            saveResult.value?.data?.insertedId);

        if (saveOk) await clearCart();

        if (mailOk && saveOk) {
          navigate("/confirm");
          Swal.fire({
            title: "Payment successful",
            text: "Your order is saved and a receipt email has been sent.",
            icon: "success",
            confirmButtonColor: "#111827",
          });
        } else if (saveOk && !mailOk) {
          navigate("/confirm");
          Swal.fire({
            title: "Order saved, email failed",
            text: "We placed your order but couldn't send the email copy.",
            icon: "info",
            confirmButtonColor: "#111827",
          });
        } else if (!saveOk && mailOk) {
          Swal.fire({
            title: "Email sent, save failed",
            text: "We emailed your receipt, but saving the order failed.",
            icon: "warning",
            confirmButtonColor: "#111827",
          });
        } else {
          Swal.fire({
            title: "Submission failed",
            text: "Both email and order save failed. Please contact support.",
            icon: "error",
            confirmButtonColor: "#111827",
          });
        }
      } catch (err) {
        Swal.fire(
          "Error",
          "Payment succeeded but something else failed!",
          "error"
        );
      }
    }

    setProcessing(false);
  };

  /* ===================== ELEGANT / MINIMAL UI ===================== */

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Page heading */}
        <div className="mb-8 text-center">
          <p className="tracking-[0.25em] text-xs uppercase text-gray-500">
            Forge &amp; Frame
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-wide text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add your shipping and payment details to complete your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] p-6 sm:p-10">
            {/* LEFT: details */}
            <div className="space-y-8">
              {/* Contact */}
              <section>
                <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-4">
                  Contact information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={user?.email || ""}
                    readOnly
                    className="w-full border border-slate-200 rounded px-4 py-3 text-sm bg-white text-gray-500 cursor-not-allowed"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                </div>
              </section>

              {/* Shipping */}
              <section>
                <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-4">
                  Shipping address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full border border-slate-200 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition"
                  />
                  <textarea
                    placeholder="Street address, house / apartment, floor"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    className="w-full border border-slate-200 rounded px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition resize-none"
                  />
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 mb-4">
                  Payment details
                </h2>
                <div className="border border-slate-200 rounded px-4 py-3 bg-white focus-within:border-black transition">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "14px",
                          color: "#111827",
                          "::placeholder": { color: "#9CA3AF" },
                          fontSmoothing: "antialiased",
                        },
                        invalid: { color: "#b91c1c" },
                      },
                    }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  🔒 Payments are processed securely via Stripe.
                </p>
              </section>

              {/* Error */}
              {err && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded text-xs flex gap-2">
                  <span className="mt-[1px]">⚠</span>
                  <span>{err}</span>
                </div>
              )}
            </div>

            {/* RIGHT: order summary */}
            <aside className="bg-slate-50 rounded border border-slate-200 px-4 py-5 sm:px-6 sm:py-6 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-600">
                  Order summary
                </h2>
                {cart?.length ? (
                  <span className="text-xs text-gray-500">
                    {cart.length} item{cart.length > 1 ? "s" : ""}
                  </span>
                ) : null}
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart?.map((item) => {
                  const qty = Number(item.quantity) || 1;
                  const price = Number(item.price) || 0;
                  const lineTotal = qty * price;
                  return (
                    <div
                      key={item._id}
                      className="flex gap-3 items-center text-sm"
                    >
                      <div className="h-14 w-14 rounded overflow-hidden bg-slate-200 flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm font-medium line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Size: {item.size || "N/A"} · Color:{" "}
                          {item.color || "N/A"}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          Qty: {qty} × ${price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        ${lineTotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}

                {!cart?.length && (
                  <p className="text-xs text-gray-500">
                    Your bag is currently empty.
                  </p>
                )}
              </div>

              <div className="mt-2 border-t border-slate-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-gray-900 pt-3 border-t border-slate-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Free shipping on orders over $89. Taxes calculated at
                  checkout.
                </p>
              </div>

              <button
                type="submit"
                disabled={!stripe || !clientSecret || processing || !cart?.length}
                className={`mt-2 w-full py-3.5 rounded-full text-sm font-semibold tracking-wide uppercase transition flex items-center justify-center ${
                  !stripe || !clientSecret || processing || !cart?.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-neutral-900 shadow-sm hover:shadow-md"
                }`}
              >
                {processing ? "Processing..." : `Pay $${total.toFixed(2)} now`}
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-1">
                By placing this order, you agree to our Terms &amp; Conditions
                and Privacy Policy.
              </p>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
