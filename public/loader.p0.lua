-- Emorce Key Loader (fixed icon cache)
local HUB = "emorce"
local API = "https://keysystem-production-9dca.up.railway.app/"
local BRAND = "Emorce"
local LOGO_URL = "https://emorce.vercel.app/icon.png"
local DIR = "Emorce"
local KEY_PAGE = "https://emorce.vercel.app/key"
local KEY_FILE = DIR .. "/keys/" .. HUB .. ".txt"
local HUB_NAME = BRAND
local KEY_LENGTH = "12 hours"
local LAST_LEFT = nil

local Players = game:GetService("Players")
local HttpService = game:GetService("HttpService")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local LP = Players.LocalPlayer
local env = getgenv and getgenv() or _G
if env.__EmorceKeyWindow then pcall(function() env.__EmorceKeyWindow:Destroy() end) end
local httpRequest = (syn and syn.request) or (http and http.request) or http_request or request or (fluxus and fluxus.request)

local function post(route, body)
	if not httpRequest then return { ok = false, error = "Your executor has no HTTP request function" } end
	local ok, res = pcall(httpRequest, { Url = API .. route, Method = "POST", Headers = { ["Content-Type"] = "application/json" }, Body = HttpService:JSONEncode(body) })
	if not ok or not res then return { ok = false, error = "Could not reach the key server" } end
	local okJson, data = pcall(HttpService.JSONDecode, HttpService, res.Body or "")
	if not okJson or type(data) ~= "table" then return { ok = false, error = "Key server error (" .. tostring(res.StatusCode) .. ")" } end
	return data
end

local function readKey()
	if not (isfile and readfile) then return nil end
	local ok, v = pcall(function() return isfile(KEY_FILE) and readfile(KEY_FILE) or nil end)
	if ok and v and #v > 0 then return (v:gsub("%s", "")) end
	return nil
end

local function saveKey(key)
	if not writefile then return end
	pcall(function()
		if makefolder and isfolder then
			if not isfolder(DIR) then makefolder(DIR) end
			if not isfolder(DIR .. "/keys") then makefolder(DIR .. "/keys") end
		end
		if key then writefile(KEY_FILE, key) elseif delfile and isfile(KEY_FILE) then delfile(KEY_FILE) end
	end)
end

local function executorName()
	if identifyexecutor then
		local ok, a, b = pcall(identifyexecutor)
		if ok and a then return b and (tostring(a) .. " " .. tostring(b)) or tostring(a) end
	end
	return "unknown"
end

local device
local function deviceInfo()
	if device then return device end
	device = {}
	pcall(function() device.platform = UserInputService:GetPlatform().Name end)
	pcall(function()
		device.touch = UserInputService.TouchEnabled
		device.keyboard = UserInputService.KeyboardEnabled
		device.gamepad = UserInputService.GamepadEnabled
	end)
	pcall(function() device.tenfoot = game:GetService("GuiService"):IsTenFootInterface() end)
	pcall(function()
		local v = workspace.CurrentCamera.ViewportSize
		device.screen = math.floor(v.X) .. "x" .. math.floor(v.Y)
	end)
	pcall(function()
		local ls = game:GetService("LocalizationService")
		device.lang = ls.RobloxLocaleId
		device.country = ls:GetCountryRegionForPlayerAsync(LP)
	end)
	pcall(function() device.age = LP.AccountAge end)
	pcall(function() device.premium = LP.MembershipType == Enum.MembershipType.Premium end)
	return device
end

local function fetchHub(key)
	local data = post("run", {
		key = key, hub = HUB, game = tostring(game.GameId), place = tostring(game.PlaceId),
		user = tostring(LP.UserId), name = LP.Name, executor = executorName(), device = deviceInfo(),
	})
	if type(data.name) == "string" then HUB_NAME = data.name end
	if type(data.length) == "string" then KEY_LENGTH = data.length end
	LAST_LEFT = data.ok and tonumber(data.left) or nil
	if data.ok and type(data.source) == "string" then return data.source end
	return nil, data.error or "Something went wrong", data.unsupported, data.needKey
end

local openWindow
local session = {}
env["__KeySession_" .. HUB] = session

local function watchGuis(bag)
	local roots = {}
	pcall(function() table.insert(roots, game:GetService("CoreGui")) end)
	if gethui then pcall(function() local h = gethui() if h and not table.find(roots, h) then table.insert(roots, h) end end) end
	local pg = LP:FindFirstChildOfClass("PlayerGui")
	if pg then table.insert(roots, pg) end
	for _, root in ipairs(roots) do
		local ok, conn = pcall(function()
			return root.ChildAdded:Connect(function(child)
				if child.Name ~= "EmorceKey" then table.insert(bag.guis, child) end
			end)
		end)
		if ok and conn then table.insert(bag.conns, conn) end
	end
end
