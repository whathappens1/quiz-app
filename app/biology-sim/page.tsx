import { Metadata } from "next";
import BiologySimPage from "../components/pages/biology-sim-page";

export const metadata: Metadata = {
  title: "محاكي نهائي لاختبار الأحياء",
  description: "هذا الاختبار يأخذ أهم الأسئلة من أوراق عمل مادة الأحياء للتدريب على الاختبار النهائي ومقسمة على كل وحدة" + " | من أ. عبدالخالق جبره",
}

export default function BiologySim() {
  return <BiologySimPage />;
}