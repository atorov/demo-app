// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.data.loading:invocation[0]": {
      type: "done.invoke.data.loading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.data.loading:invocation[0]": {
      type: "error.platform.data.loading:invocation[0]";
      data: unknown;
    };
    "xstate.after(0)#data.pre_loading": {
      type: "xstate.after(0)#data.pre_loading";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    load: "done.invoke.data.loading:invocation[0]";
  };
  missingImplementations: {
    actions: "onErrorEntry";
    services: "load";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    onErrorEntry: "error.platform.data.loading:invocation[0]";
  };
  eventsCausingServices: {
    load: "xstate.after(0)#data.pre_loading";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "done" | "error" | "loading" | "pre_loading";
  tags: never;
}
