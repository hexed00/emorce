-- Emorce Key Loader bootstrap (multipart)
local parts = {}
for i = 0, 3 do
	local ok, body = pcall(game.HttpGet, game, "https://raw.githubusercontent.com/hexed00/emorce/main/public/loader.p" .. i .. ".lua")
	assert(ok and body and #body > 0, "failed part " .. i)
	parts[#parts + 1] = body
end
loadstring(table.concat(parts))()
