import { AiFillTwitterCircle } from "react-icons/ai";
export default function footers() {
    return(
        <footer className="container mx-auto bg-white py-8 border-t border-gray-400">
        <div className="container flex px-3 py-8 ">
            <div className="w-full mx-auto flex flex-wrap">
                <div className="flex w-full lg:w-1/2 ">
                    <div className="px-3 md:px-0">
                        <h3 className="font-bold text-gray-900">About</h3>
                        <p className="py-4">
                        The My Recipes recipe app that helps you instantly browse to the recipe. 
                        </p>
                    </div>
                </div>
                <div className="flex w-full lg:w-1/2 lg:justify-end lg:text-right">
                    <div className="px-3 md:px-0">
                        <h3 className="font-bold text-gray-900">Social</h3>
                        <ul className="list-reset items-center pt-3">
                            <li>
                                <a className="inline-block no-underline hover:text-black hover:underline py-1" href="https://twitter.com/michaelbelete16"><AiFillTwitterCircle size={40} className="text-blue-500"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <center className="w-full text-lg font-bold">
                Proudly Developed by <a href="https://www.github.com/michaelbelete" className="text-blue-500">Michael Belete</a>
            </center>
    </footer>
    ) 
}