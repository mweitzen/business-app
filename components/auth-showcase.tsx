import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@/lib/api";

const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        {status === "loading" ? <>Loading...</> : null}
        {status === "unauthenticated" ? <span>Not logged in.</span> : null}
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-purple-400 px-10 py-3 font-semibold text-white no-underline transition hover:bg-purple-400/80 disabled:cursor-not-allowed disabled:bg-gray-400"
        onClick={sessionData ? () => signOut() : () => signIn()}
        disabled={status === "loading"}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
export default AuthShowcase;
