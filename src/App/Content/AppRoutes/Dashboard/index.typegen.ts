// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.data.loading:invocation[0]": {
      type: "done.invoke.data.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.after(550)#data.pre_loading": {
      type: "xstate.after(550)#data.pre_loading";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    load: "done.invoke.data.loading:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "load";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    load: "xstate.after(550)#data.pre_loading";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "done" | "loading" | "pre_loading";
  tags: never;
}
