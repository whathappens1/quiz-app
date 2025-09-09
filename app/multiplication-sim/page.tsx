import MultiplicationForm from "../components/forms/multiplication-form"

 export async function generateMetadata() {
  return {
    title: "أختبار جدول الضرب",
  }
}
 
export default async function MultiplicationPage() {
  return <MultiplicationForm />
}