-- Emorce Key Loader bootstrap
local src = game:HttpGet("https://raw.githubusercontent.com/hexed00/emorce/main/public/loader.full.lua")
assert(src and #src > 100, "failed to fetch Emorce loader")
loadstring(src)()
