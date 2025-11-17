import BiologyForm from "../components/forms/biology-form"

 export async function generateMetadata() {
  return {
    title: "أختبار محاكاة الفترة الثانية أحياء",
  }
}
 
export default async function MultiplicationPage() {
  return <BiologyForm />
}