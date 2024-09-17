import ApiHelper from "@/utills/ApiHelper";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
const DummyUsers = [
    { id: 1, name: "abi", phoneNumber: "8870749992", otp: "1234" },
    { id: 2, name: "abisha", phoneNumber: "9092352203", otp: "5678" },
  ];
  
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "authCredentials",
            name: 'authCredentials',  
            authorize: async (credentials) => {
                try {
                    const data = await ApiHelper.post(
                        '/auth/login',
                        credentials
                    );
                    let result = data;

                    let user = {
                        id: result.id,
                        image: result.image,
                        username: result.username,
                        email: result.email,
                        token: result.token,
                        firstName: result.firstName,
                        lastName:result.lastName,
                        gender:result.gender,
                    }

                    return Promise.resolve(user);
                } catch (error) {
                    throw new Error(error?.message);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXTAUTH_CLIENT_ID ,
            clientSecret: process.env.NEXTAUTH_SECRET ,
          }),
          CredentialsProvider({
            id: "otpLogin",
            name: 'otpLogin',  
            credentials:{
                phoneNumber: { label: "Phone Number", type: "text" },
                otp: { label: "OTP", type: "text" },
            },
            async authorize(credentials){
                const user = DummyUsers.find((users)=>users.phoneNumber === credentials.phoneNumber && users.otp === credentials.otp);
                if(user){
                    return{id:user.id,name:user.name}
                }
                return null;
            },
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.image = user.image;
                token.username = user.username;
                token.email = user.email;
                token.firstName = user.firstName;
                token.token = user.token;
                token.lastName= user.lastName;
                token.gender=user.gender
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
console.log(session,"session")
            return session;
        },
    },
}

export default NextAuth(authOptions)