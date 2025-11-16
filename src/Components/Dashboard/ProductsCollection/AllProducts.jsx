import React, { useState } from "react";

const initialProducts = [
  {
    id: "newin-catharine-maxi-brown",
    name: "Catharine Floral Lace Sheer Maxi Dress",
    price: 109,
    currency: "USD",
    category: "New in",
    images: [
      "https://media.istockphoto.com/id/1440977634/photo/vertical-shot-of-the-beautiful-pink-dress-isolated-on-the-white-background.jpg?b=1&s=612x612&w=0&k=20&c=4_piA2edAWWWQ7VyUl7hWJy32yU4xuLE1-iKvKNm2Fk=",
    ],
  },
  {
    id: "abaya-elegant-black-open",
    name: "Elegant Black Open Abaya",
    price: 89,
    currency: "USD",
    category: "Abayas",
    images: [
      "https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg",
    ],
  },
  {
    id: "top-classic-white-shirt",
    name: "Classic Tailored White Shirt",
    price: 49,
    currency: "USD",
    category: "Tops /shirts",
    images: [
      "https://images.pexels.com/photos/995978/pexels-photo-995978.jpeg",
    ],
  },
  // 👉 continue adding the rest of your products here using the same shape
];

const AllProducts = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleEdit = (id) => {
    // later: navigate(`/dashboard/edit-product/${id}`)
    console.log("Edit product:", id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white border border-slate-100 rounded-lg shadow-sm p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            All Products
          </h2>
          <p className="text-sm text-slate-500">
            Manage your clothing catalog: edit details or remove items.
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Total products:{" "}
          <span className="font-medium text-slate-600">
            {products.length}
          </span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-[#F9F6F2] text-slate-600">
              <th className="text-left px-3 py-2 font-medium">#</th>
              <th className="text-left px-3 py-2 font-medium">Product</th>
              <th className="text-left px-3 py-2 font-medium">Category</th>
              <th className="text-left px-3 py-2 font-medium">Price</th>
              <th className="text-left px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              const img =
                Array.isArray(product.images) && product.images.length > 0
                  ? product.images[0]
                  : "";

              return (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                >
                  <td className="px-3 py-2 text-slate-500 align-middle">
                    {idx + 1}
                  </td>

                  {/* Product cell (image + name) */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      {img && (
                        <img
                          src={img}
                          alt={product.name}
                          className="w-12 h-16 object-cover rounded-md border border-slate-100 bg-slate-50"
                        />
                      )}
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-2">
                          {product.name}
                        </p>
                        {product.id && (
                          <p className="text-xs text-slate-400 mt-0.5">
                            ID: {product.id}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 py-2 align-middle">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs rounded bg-slate-50 text-slate-700 border border-slate-100">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-3 py-2 align-middle text-slate-800">
                    {product.currency === "USD" ? "$" : ""}
                    {Number(product.price).toFixed(2)}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-2 align-middle">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="px-3 py-1.5 text-xs rounded border border-slate-200 text-slate-700 hover:bg-[#F9F6F2] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 text-xs rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-sm text-slate-400"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
