import React, { useCallback, useState } from "react";
import css from "./SignupForm.module.css";

type User = {
  user: string;
  password: string;
};

export const SignupForm: React.FC = () => {
  const [user, setUser] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [verifiedPassword, setVerifiedPassword] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleSubmit = useCallback(() => {
    setMessage("");

    if (password !== verifiedPassword) {
      setMessage("Passwords don't match");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") ?? "[]");

    if (users.find((savedUser) => savedUser.user === user)) {
      setMessage("User already exists");
      return;
    }

    localStorage.setItem(
      "users",
      JSON.stringify([...users, { user, password }])
    );

    setMessage("");
  }, [user, password, verifiedPassword]);

  return (
    <div className={css.form}>
      <label className={css.label}>
        Username:
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.currentTarget.value)}
        />
      </label>
      <label className={css.label}>
        Create Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </label>
      <label className={css.label}>
        Re-type Password:
        <input
          type="password"
          value={verifiedPassword}
          onChange={(e) => setVerifiedPassword(e.currentTarget.value)}
        />
      </label>
      <button onClick={handleSubmit}>Create User</button>
      <div>{message}</div>
    </div>
  );
};
