import { useRouter } from "next/router";
import { InstructorProvider } from ".";

const Home = () => {
  const router = useRouter();
  const sectionId = router.query.sectionId as string;
  const envOrTemplateId = router.query.envOrtemplateId as string;
  return (
    <InstructorProvider sectionId={sectionId}>
      <div></div>
    </InstructorProvider>
  );
};

export default Home;
