export default async function UserProfile({ params }: any) {
    const {id} = await params

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">User: <span className="p-2 ml-2 rounded bg-blue-600 text-gray-100">{id}</span></p>
    </div>
  );
}
