import { withAuth } from "next-auth/middleware";
import { GetUserFromRequest } from "./services/token/GetUserFromRequest";

export default withAuth(
  async function middleware(req) {
    const user = await GetUserFromRequest(req);

    if (!user) {
      return;
    }
  },
  {
    callbacks: {
      authorized: async ({ req, token }) => {
        if (!token) {
          return false;
        }

        return true;
      },
    },
  }
);

export const config = { matcher: ["/:path+"] };
