import { CatalogForm } from "@/components/catalog/catalog-form";
export default async function EditCatalogItemPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  return (
    <div className="max-w-2xl space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Edit Catalog Item</h1><p className="text-gray-500 text-sm mt-1">Update product details.</p></div>
      <CatalogForm itemId={itemId} />
    </div>
  );
}
