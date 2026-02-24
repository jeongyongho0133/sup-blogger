import ListingForm from './_components/ListingForm';

export default function NewListingPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">새 매물 등록</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <ListingForm />
      </div>
    </div>
  );
}
