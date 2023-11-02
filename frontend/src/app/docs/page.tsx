import Image from 'next/image'

function Docs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-2xl mb-3">Docs Page</h1>
      <p>View our github and learn about our journey here.</p>
      <div className="mt-10">
        <Image
          src="/documentation.png" // replace with your actual image path
          alt="Sphere head office"
          width={800}
          height={800}
        />
      </div>
    </div>
  )
}

export default Docs