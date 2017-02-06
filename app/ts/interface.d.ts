//
// Global declaration file
//

declare module featureLib {
    interface Dataset{
        AddRow(...foo)
    }
}

interface Event { dataTransfer: any }

declare function nodeRequire(name: string);


// Donghao: Set, Map, WeakSet, WeakMap are not declared for ES5 mode, declare them here?
// From https://github.com/Microsoft/typescript-build2016-demos/blob/master/ng-reddit/node_modules/angular2/typings/es6-collections/es6-collections.d.ts
// // Note that ideally we should support es6, but typescript does not yet support it: https://typescript.codeplex.com/wikipage?title=ECMAScript%206%20Status&referringTitle=Roadmap. Revisit later.'
interface IteratorResult<T> {
    done: boolean;
    value?: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface ForEachable<T> {
    forEach(callbackfn: (value: T) => void): void;
}

interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    entries(): Iterator<[K, V]>;
    keys(): Iterator<K>;
    values(): Iterator<V>;
    size: number;
}

interface MapConstructor {
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: ForEachable<[K, V]>): Map<K, V>;
    prototype: Map<any, any>;
}

declare var Map: MapConstructor;

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    entries(): Iterator<[T, T]>;
    keys(): Iterator<T>;
    values(): Iterator<T>;
    size: number;
}

interface SetConstructor {
    new <T>(): Set<T>;
    new <T>(iterable: ForEachable<T>): Set<T>;
    prototype: Set<any>;
}

declare var Set: SetConstructor;

interface WeakMap<K, V> {
    delete(key: K): boolean;
	clear(): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
}

interface WeakMapConstructor {
    new <K, V>(): WeakMap<K, V>;
    new <K, V>(iterable: ForEachable<[K, V]>): WeakMap<K, V>;
    prototype: WeakMap<any, any>;
}

declare var WeakMap: WeakMapConstructor;

interface WeakSet<T> {
    delete(value: T): boolean;
	clear(): void;
    add(value: T): WeakSet<T>;
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T>(): WeakSet<T>;
    new <T>(iterable: ForEachable<T>): WeakSet<T>;
    prototype: WeakSet<any>;
}

declare var WeakSet: WeakSetConstructor;