# Changelog

## 0.2.0 - unreleased

- Add `override_item` (not tested)
- Add `register_alias`
- Add `register_item`
- Update `LtGroupCapability` for compatibility with minimal game
- Update `LtToolCapabilities` for compatibility with minimal game
- Remove `LtItemGroups` as it's not used by the engine
- Remove `choppy` from `LtGroupCapabilities`

## 0.1.0 - 2025-03-28

Initial release, forked from [@repcomm/mt-api](https://github.com/RepComm/mt-api)

Initial features:

- Exports `core` namespace with a few functions documented in the API

Changes from [@repcomm/mt-api@c8e54b1](https://github.com/RepComm/mt-api/tree/c8e54b1):

- Rename from Minetest to Luanti
  - Change Mt* to Lt*
  - Change `minetest` to `core`
- Cleanup readme
