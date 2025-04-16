"use client";
import { useState } from "react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem} from "@/components/ui/form";
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Span } from "next/dist/trace";

// Create schema with two fields
const formSchema = z.object({
    trophiesInput: z.string()
      .min(1, "Required")
      .regex(/^\d+$/, "Must be a whole number")
      .refine(v => parseInt(v) >= 0, "Can't be negative"),
    masteryInput: z.string()
      .min(1, "Required")
      .regex(/^\d+$/, "Must be a whole number")
      .refine(v => parseInt(v) >= 0, "Can't be negative")
  });

// All various ranges of trophies (official web-page).
// Variable masteryPoints is corresponding amount of
// mastery points gotten per won match.
const TROPHY_RANKS = {
    R1: { min: 0, max: 49, masteryPoints: "5" },
    R2: { min: 50, max: 99, masteryPoints: "7" },
    R3: { min: 100, max: 149, masteryPoints: "10" },
    R4: { min: 150, max: 199, masteryPoints: "12" },
    R5: { min: 200, max: 249, masteryPoints: "15" },
    R6: { min: 250, max: 299, masteryPoints: "17" },
    R7: { min: 300, max: 349, masteryPoints: "20" },
    R8: { min: 350, max: 399, masteryPoints: "23" },
    R9: { min: 400, max: 449, masteryPoints: "25" },
    R10: { min: 450, max: 499, masteryPoints: "27" },
    R11: { min: 500, max: 549, masteryPoints: "35" },
    R12: { min: 550, max: 599, masteryPoints: "40" },
    R13: { min: 600, max: 649, masteryPoints: "45" },
    R14: { min: 650, max: 699, masteryPoints: "50" },
    R15: { min: 700, max: 749, masteryPoints: "55" },
    R16: { min: 750, max: 799, masteryPoints: "60" },
    R17: { min: 800, max: 849, masteryPoints: "65" },
    R18: { min: 850, max: 899, masteryPoints: "70" },
    R19: { min: 900, max: 949, masteryPoints: "75" },
    R20: { min: 950, max: 999, masteryPoints: "80" },
    R21: { min: 1000, max: 1049, masteryPoints: "85" },
    R22: { min: 1050, max: 1099, masteryPoints: "90" },
    R23: { min: 1100, max: 1149, masteryPoints: "95" },
    R24: { min: 1150, max: 'max', masteryPoints: "100" }
};

// Finding range
function findTrophyRange(points: number) {
    return Object.values(TROPHY_RANKS).find(range => {
        // Checks if points is within the min and max values of each range
        const isInMinRange = points >= range.min;
        const isInMaxRange = range.max === 'max' || (typeof range.max === 'number' && points <= range.max);
        return isInMinRange && isInMaxRange;
    });
}

// Home page
export default function Home() {
    // Set up useState to update and display variable as HTML
    const [winAmnt, setWinAmnt] = useState <number | null> (null);
    // Type inference
    const form = useForm <z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        // Form values
        defaultValues: {
            trophiesInput: "",
            masteryInput: ""
        }
    });
    
    // Function for submit
    const submit = ({ trophiesInput, masteryInput }: z.infer<typeof formSchema>) => {
        // Converts String -> Integer
        const trophiesAmnt = Number(trophiesInput);
        const masteryAmnt = Number(masteryInput);
        
        // Defines current range
        const trophyRange = findTrophyRange(trophiesAmnt);
        // Mastery points gotten per won match
        const masteryPoints = Number(trophyRange?.masteryPoints);
        
        // Lazy error-check
        if (masteryAmnt >= 24800) {
            // Sets error in form, input won't get handled if true
            form.setError("masteryInput", { message: "Mastery already maxed!" });
            return;
        }

        // Basic Calculation - This will use React's useState to update the variable "result"
        // so that we can use it as WinAmnt later (see first line of Home() function).
        const result = (24800 - masteryAmnt) / masteryPoints;
        setWinAmnt(result);
        
        // FUTURE ADDITION: Calculation w/ Mastery Madness toggled:
        // const winAmntMM = (24800 - masteryAmnt) / (masteryPoints * 1.5);
        
        // Logging for testing
        console.log("Current Trophies: " + trophiesAmnt);
        console.log("Current Mastery: " + masteryAmnt);
        console.log("Mastery per Win: " + masteryPoints);
        console.log("Needed Wins: " + Math.ceil(result))
    }
    
    return (
        <main>
           <div className="fixed inset-0 bg-night h-[200dvh] w-full -z-10"
                // Some styling to get rid of white background
                style={{
                    minHeight: '-webkit-fill-available',
                    height: '100vh', // Fallback
                    }}>
           </div>
            
            <div className = "relative flex justify-center items-center">
                <h1 className = "fixed text-[2.75rem] text-white mt-40">MasteryMeter</h1>
                <p className = "fixed text-xl text-white text-left mt-82 ml-6 w-80">Calculate exactly how many wins you need to reach <span className = "bg-gradient-to-l from-orange-400 to-yellow-500 bg-clip-text text-transparent">Gold III</span> in <br/>Brawl Stars. Grind smarter! 🏆</p>
                <p className = "bg-gradient-to-l from-orange-400 to-yellow-500"></p>
            </div>
            
            <div className = "relative flex justify-center items-center mt-52">
                <Form {...form}>
                    <form onSubmit = {form.handleSubmit(submit)} className="absolute w-75 flex flex-col gap-4 text-white mt-72">
                    
                        <FormField
                            control = {form.control}
                            name = "trophiesInput"
                            render = {({ field }) => {
                                
                                return <FormItem>
                                    <Input className = "w-full h-12 bg-night-light bg-[url('/trophy.svg')] bg-no-repeat bg-[position:10px_50%] pl-12 text-white"
                                        placeholder = "Enter Current Trophies"
                                        type = "text"
                                        inputMode = "numeric"
                                        pattern = "[0-9]*"
                                        {...field}>
                                    </Input>
                                </FormItem>
                            }}
                        />
                        
                        <FormField
                            control = {form.control}
                            name = "masteryInput"
                            render = {({ field }) => {
                                
                                return <FormItem>
                                    <Input className = "w-full h-12 bg-night-light bg-[url('/star.svg')] bg-no-repeat bg-[position:10px_50%] pl-12 text-white"
                                        placeholder = "Enter Current Mastery"
                                        type = "text"
                                        inputMode = "numeric"
                                        pattern = "[0-9]*"
                                        {...field}>
                                    </Input>
                                </FormItem>
                            }}
                        />

                        <Button className = "w-full h-12 bg-night-light text-white text-md mt-6" type="submit">Submit</Button>                
                    </form>
                </Form>
            </div>

            <div className = "relative flex justify-center items-center mt-28">
                <p className="fixed text-xl text-white text-left mt-96 ml-6 w-80">You need {winAmnt !== null ? Math.ceil(winAmnt) : "X"} wins to <br /> reach <span className="bg-gradient-to-l from-orange-400 to-yellow-500 bg-clip-text text-transparent">Gold III</span> Mastery.</p>
            </div>

            <div className="fixed bottom-0 left-0 right-0 py-4 bg-night border-t border-night-light/50">
                <div className="flex items-center justify-center gap-2">
                    <img src="/github.png" alt="GitHub Repository" className="w-5 h-5" />
                    <p className="text-sm text-white">This <a href="https://github.com/ebbekarlstad/masterymeter" target="_blank" className="text-blue-400">project</a> was made by Ebbe Karlstad.</p>
                </div>
            </div>
        </main>
    );
}