/* eslint-disable no-console */
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/auth";

import api from "../utils/api";
export const LoginForm = () => {
  const { authenticate } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitForm = async () => {
    try {
      // const { data: token } = await routes.user.login.request({
      // 	email,
      // 	password,
      // });
      const {
        // data: { jwt: token, user },
        data: { jwt: token },
        // } = await axios.post('http://localhost:1337/auth/local', {
      } = await api.post("auth/local", {
        identifier,
        password,
      });
      // await authenticate(token.token);
      // debugger;
      await authenticate(token);
      // setSubmitting(false);
      router.push("/expo");
    } catch (error) {
      // const formikErrors = error.response.data.errors.reduce(
      //   (acc, error) => ({ ...acc, [error.field]: error.message }),
      //   {}
      // );
      // setErrors(formikErrors);
      // setSubmitting(false);
    }
  };
  return (
    // <form className='flex flex-col' method='POST' action='/api/login'>
    <div className="w-72 px-6 py-8 rounded-lg bg-gray-200">
      {/* <h1 className='mb-4'>{message}</h1> */}
      <form className="flex flex-col">
        <input
          className="mb-2 text-xl"
          type="text"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="username"
        />
        <input
          className="mb-2 text-xl"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <div
          className="mt-8 py-2 px-3 rounded-full bg-rose-800 text-white text-xl"
          onClick={submitForm}
        >
          Login
        </div>
      </form>
    </div>
  );
};
