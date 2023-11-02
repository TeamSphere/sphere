import Image from 'next/image'

function Docs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-2xl mb-3">Invest</h1>
      <p>Invest in the sphere and keep the ball rolling.</p>
      <div className="mt-10">
        <Image
          src="/investment.png" // replace with your actual image path
          alt="Invest in the Sphere"
          width={800}
          height={800}
        />
      </div>
    </div>
  )
}

export default Docs