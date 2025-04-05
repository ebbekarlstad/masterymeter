import { Input } from "@/components/inputTrophies";

export default function Home() {
    return (
        <>
            <div className="absolute h-svh w-svw object-cover bg-radial from-gray-900 from-40% to-gray-950"></div>
            
            <div className="relative flex justify-center items-center">
                <h1 className="fixed text-[2.75rem] text-white mt-48">MasteryMeter</h1>
                <p className="fixed text-2xl text-white mt-72">cool p tag yuh</p>
            <Input className="fixed w-44 mt-96"/>
            </div>
            
        </>
    );
}