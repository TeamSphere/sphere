import Image from 'next/image'

function Docs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-2xl mb-3">Learn</h1>
      <p>Learn about anything covering the breadth of human knowledge.</p>
      <div className="mt-10">
        <Image
          src="/learn.png" // replace with your actual image path
          alt="Learn anything"
          width={800}
          height={800}
        />
      </div>
    </div>
  )
}

export default Docs