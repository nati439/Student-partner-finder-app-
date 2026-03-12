// import  bg from './assets/logo.jpg'; //This import picture for my background
// import React, { useState } from 'react'; // I am importing useState so i can use it
// export default function Hearder() { // This create whole new function and make it avaiable to be imported.  
   
//     const [tasks, setTasks] = useState([]); // THis create useState like a place where every task is in here
//     const [input, setInput] = useState(""); // This create useState like a place where current task is in here


//     function handleTodoapp(event){ // create function that reads user task
//         setInput(event.target.value); // All those working togther make it able to read
//     }


//     //what the function below does is check if there any item clicked. If yes it copys the whole object so this "..." and than if it was true it turn it false and same other way around.
//     // Remeber index is the "index" of the item you get click and we loop through task and check if i which is also "index" we check if it matchs with any item that was clicked.
//     function toggleComplete(index) {
//         setTasks(
//             tasks.map((task, i) =>
//                 i === index ? { ...task, completed: !task.completed } : task
//             )
//         );
//     }


//     return(
//     <div //This just make it possible for us to see the background and we style it so it don't act wried
//         className="h-screen bg-cover bg-center bg-no-repeat flex justify-center items-start pt-20"
//         style={{backgroundImage: `url(${bg})`}}
//     >
//         {/*The div below just styles the whole box where every item sits*/}
//         <div className="w-96 p-8 bg-black-200 flex flex-col items-center rounded-xl  min-h-[500px] mb-10 ">
       
//             {/*the h1 below just adds the title*/}
//             <h1 className="text-5xl font-bold text-gray-800 mb-15">
//                 To-Do-List
//             </h1>            
           
           
//             <div>
//                 {/* the div below is the place we let user type what they want*/}
//                 <div className="relative w-full">
//                     <input
                       
//                         type="text"
//                         placeholder="Add a task"
//                         className="w-full p-3 pr-20 border border-blue-400 rounded-lg text-lg focus:outline-none"
//                         value={input} // Whatever you type on keyboard, shows it in box. Like as you type A it shows in there bc of this. Value can't be renamed
//                         onChange={handleTodoapp} // THe code above display the text this actully reads it.
//                     />
                   
//                     {/* The code below controlls what happen to When we click Add*/}
//                     {/*So what happpen when we click ADD is it create a hashmap with the input and false. The reason we set us this way is so we can toggle it. Also at end It make it when we click ADD everything clears*/}
//                     <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => {setTasks([...tasks, {text: input, completed: false}]); setInput("");}}>
//                         Add
//                     </button>
                   
//                 </div>


           
//                 <nav className="mt-6 w-full"> {/* Styles the boxs where the lists stays like the gap*/}
//                     <ul className="space-y-3"> {/*same thing here as top*/}
//                         {tasks.map((task, index) => ( // This loops through all the items, lists
//                             <li
//                                 key={index} // key helps React track each element in a list so updates, additions, or deletions happen correctly. In big project you use unique IDs.
//                                 className="flex justify-between items-center bg-white p-3 rounded-lg" // Controls the height of the white place the box.
//                             >
//                                 <span // This see put line through if item is true and nothing if not. It also display.
//                                     className={`text-lg ${
                                       
//                                         task.completed ? "line-through text-gray-400" : ""
//                                     }`}
//                                 >
//                                     {/*Go into this task object and display the text value.*/}
//                                     {task.text}
//                                 </span>


//                                 <div className="flex gap-2">
//                                     <button
//                                         className="bg-green-500 px-2 rounded-full text-white"
//                                         onClick={() => toggleComplete(index)}// This gives the item index that was clicked to function above*/} 
//                                     >
//                                         ✓
//                                     </button>


//                                     <button
//                                         className="bg-red-500 px-2 rounded-full text-white"
//                                         onClick={() => // THis removes the item that was clicked by checking if it matchs with i.
//                                             setTasks(tasks.filter((_, i) => i !== index))
//                                         }
//                                     >
//                                         X
//                                     </button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     </div>
//     );
// }
