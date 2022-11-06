// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.login.logging_in:invocation[0]": {
      type: "done.invoke.login.logging_in:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.login.logging_in:invocation[0]": {
      type: "error.platform.login.logging_in:invocation[0]";
      data: unknown;
    };
    "xstate.after(0)#login.done": { type: "xstate.after(0)#login.done" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    login: "done.invoke.login.logging_in:invocation[0]";
  };
  missingImplementations: {
    actions: "onEntryDone";
    services: "login";
    guards: "isAuth";
    delays: never;
  };
  eventsCausingActions: {
    onEntryDone: "xstate.after(0)#login.done";
  };
  eventsCausingServices: {
    login: "LOGIN";
  };
  eventsCausingGuards: {
    isAuth: "";
  };
  eventsCausingDelays: {};
  matchesStates: "done" | "entering_credentials" | "logging_in";
  tags: never;
}
