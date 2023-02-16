import { useForm } from "react-hook-form";

const AddStudent = () => {
    const { register,
        handleSubmit,
        formState: { errors, isValid } 
    } = useForm({mode: "all"});

    const Input = ({label, required, type, placeholder, name}) => (
        <div className="relative">
            <legend className="mt-2 text-left text-gray-700 pb-1">{label}</legend>
            <input name={name} {...register(label, { required })}
                className={`${errors[label] && "border !border-red-400"} w-full bg-gray-100 border border-gray-300 p-2 rounded focus:border-blue-500 focus:bg-white placeholder-gray-400`}
                type={type} placeholder={placeholder}   
            />
            { errors[label] && <span className="absolute right-0 -bottom-5 text-red-400 text-xs">mandatory</span> }
        </div>
    )

    const onSubmit = async(data) => {
        try{
            
            const response = await axios.post(`http://localhost:4000/api/students`, 
                {

                }
            ); 
            
        }catch(err){
            console.log("err",err)
        }
    }
    return ( 
        <main className="min-h-[calc(100vh-80px)] w-full font-roboto py-6 flex flex-col justify-center items-center sm:py-12">
            <form className="bg-white text-noir p-8 w-11/12 md:w-1/2 lg:w-2/5 shadow-sm" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl font-bold mb-4">Add your collection</h2>
                <div className="flex flex-col gap-1 mb-8">
                    
                    <Input label="first name" required type="text" placeholder="Type your first name"/>
                    <Input label="last name" required type="text" placeholder="Type your last name"/>
                    <Input label="date of birth" required type="date" placeholder="insert your date of birth" />
                    <Input label="email" required type="email" placeholder="type your email address" />
                </div>
            </form>
       </main>
     );
}
 
export default AddStudent;