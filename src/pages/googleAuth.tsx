import { useRouter } from "next/router";
import { googleAPI } from "../lib/api/googleAPI";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { useCnails } from "../contexts/cnails";

const GoogleAuth = () => {
  const router = useRouter();
  const { sub } = useCnails();
  useEffect(() => {
    const init = async () => {
      if (!router.isReady) return;
      const { code } = router.query;
      await googleAPI.getAccessToken(decodeURI(code as string), sub);
      router.push("/file_transfer");
    };
    init();
  }, [router.isReady]);

  return (
    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl text-[#415A6E]">
      <Loader />
    </div>
  );
};
GoogleAuth.displayName = "GoogleAuth";
export default GoogleAuth;
