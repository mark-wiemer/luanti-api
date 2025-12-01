# Luanti API

> [!IMPORTANT]
> This project has been moved into [my hello-hello monorepo](https://github.com/mark-wiemer/hello-hello/tree/main/packages/luanti/luanti-ts-api), it's not abandoned!

Type definitions for using the Luanti ([formerly Minetest](https://blog.luanti.org/2024/10/13/Introducing-Our-New-Name/)) API via TypeScriptToLua

## Usage

Install dev dependency in your TypeScript project:

```sh
npm i @mark-wiemer/luanti-api --save-dev
```

And use:

```ts
import type {} from "@mark-wiemer/luanti-api";
```

The module declares the Luanti global the same way you'd use it in Lua

You can also utilize the types it provides in your own code by importing them:

```ts
import type { LtVec3 } from "@mark-wiemer/luanti-api";

let myVec: LtVec3 = { x: 0, y: 0, z: 0 };
```

`core` is the only supported namespace alias, `minetest` will not work:

```ts
core.register_on_joinplayer((player) => {
  const playername = player.get_player_name();

  core.chat_send_player(playername, "Welcome!");
});
```

Users of Luanti's Lua api will notice a lack of `:` in TypeScript

Lua uses `obj:method` and `obj.func` to differentiate with `obj` is passed as `self` as the first argument

For instance:

```lua
local obj = {
  method = function (self)
    --"self" refers to obj, similar to "this" in TypeScript
  end

  func = function ()
    --no self variable here
  end
};

obj.method() -- self will be nil
obj:method() -- self will be obj

obj.func() -- self will be nil
obj:func() -- self will still be nil because its not declared in function args
```

In TypeScript this is handled by providing a `this` definition:

```ts
interface LuantiGlobal {
  register_on_joinplayer (this: void, cb: LtPlayerJoinCallback): void;
}
declare global core: LuantiGlobal;
```

Because

```ts
this: void
```

TypeScript calls to `core.register_on_joinplayer()` will properly output:
`core.register_on_joinplayer()` in lua

Without providing `this: void`, this would generate:
`core:register_on_joinplayer()` as TypeScriptToLua assumes we want to provide a `self` reference as first argument

On the flip-side:

```lua
function handle_player_join (player) --player is ObjRef
  player:get_player_name() -- passes player as first arg to get_player_name code
end

core.register_on_joinplayer ( handle_player_join )
```

In TypeScript definitions:

```ts
interface ObjRef {
  //implicit this: ObjRef
  get_player_name(): string;
  //same as
  get_player_name(this: ObjRef): string;
}
```

Which both properly output:

```lua
player:get_player_name()
```

## Acknowledgements

This project is a fork of [@repcomm/mt-api](https://github.com/RepComm/mt-api) from 2023.
