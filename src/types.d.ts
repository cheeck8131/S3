type ArrayElements<T extends any[]> = T extends (infer E)[] ? E : never;
