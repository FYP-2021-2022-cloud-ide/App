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
    <div className="h-full w-full relative">
      <div className="flex items-center justify-center h-full">
        <Loader />
      </div>
    </div>
  );
};
GoogleAuth.displayName = "GoogleAuth";
export default GoogleAuth;
