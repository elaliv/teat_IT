import SignUpForm from "@/components/forms/SignUpForm";
import Card from "@/components/ui/Card";

const page = () => {
    return (
      <div className="flex justify-center items-center h-[90vh]">
      <Card>
        <div className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-4xl max-w-[70%] text-center">
            Hai, fa foamea cu noi!
          </h1>
          <SignUpForm />
        </div>
      </Card>
    </div>
    );
}

export default page;