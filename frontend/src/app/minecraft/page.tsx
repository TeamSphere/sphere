import Image from 'next/image'

function Docs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-2xl mb-3">Minecraft</h1>
      <p>Join and survive in our evolving educative Minecraft world.</p>
      <div className="mt-10">
        <Image
          src="/minecraft.png" // replace with your actual image path
          alt="Minecraft"
          width={800}
          height={800}
        />
      </div>
    </div>
  )
}

export default Docs