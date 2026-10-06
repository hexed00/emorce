local function shutDown(bag, message)
	if bag.done then return end
	bag.done = true
	for _, c in ipairs(bag.conns) do pcall(function() c:Disconnect() end) end
	for _, inst in ipairs(bag.guis) do pcall(function() inst:Destroy() end) end
	if cleardrawcache then pcall(cleardrawcache) end
	env["__KeyExpired_" .. HUB] = true
	saveKey(nil)
	env.__EmorceLastError = message
	if env["__KeySession_" .. HUB] == session and openWindow then openWindow() end
end

local function launch(source, key)
	local fn, err = loadstring(source, "=" .. HUB)
	if not fn then warn("[" .. BRAND .. "] failed to load: " .. tostring(err)) return end
	local bag = { guis = {}, conns = {} }
	local left = LAST_LEFT
	local keyed = key ~= nil and key ~= ""
	if keyed then watchGuis(bag) end
	env["__KeyExpired_" .. HUB] = false
	task.spawn(fn)
	local mine = function() return not bag.done and env["__KeySession_" .. HUB] == session end
	local who = { hub = HUB, key = keyed and key or nil, user = tostring(LP.UserId), name = LP.Name, place = tostring(game.PlaceId) }
	if keyed and left then
		local deadline = os.clock() + left
		task.spawn(function()
			while mine() do
				local remaining = deadline - os.clock()
				if remaining <= 0 then shutDown(bag, "Your key has expired. Get a new one to keep using " .. HUB_NAME .. ".") return end
				task.wait(math.min(remaining, 30))
			end
		end)
	end
	task.spawn(function()
		while mine() do
			local data = post("ping", who)
			if data.ok == false and data.rejected and keyed then shutDown(bag, data.error) return end
			task.wait(60)
		end
	end)
end

local saved = readKey()
do
	local source, err, unsupported, needKey = fetchHub(saved or "")
	if source then launch(source, saved) return end
	if saved and needKey then saveKey(nil) end
	if unsupported or saved or not needKey then env.__EmorceLastError = err end
end

openWindow = function()
if env.__EmorceKeyWindow then pcall(function() env.__EmorceKeyWindow:Destroy() end) end
local C = {
	bg = Color3.fromRGB(14, 14, 16), card = Color3.fromRGB(20, 20, 23), field = Color3.fromRGB(26, 26, 30),
	line = Color3.fromRGB(38, 38, 44), text = Color3.fromRGB(245, 245, 247), muted = Color3.fromRGB(150, 150, 160),
	faint = Color3.fromRGB(100, 100, 110), good = Color3.fromRGB(52, 211, 153), bad = Color3.fromRGB(239, 90, 90),
}
local FONT = Font.new("rbxasset://fonts/families/GothamSSm.json", Enum.FontWeight.Medium)
local FONT_BOLD = Font.new("rbxasset://fonts/families/GothamSSm.json", Enum.FontWeight.Bold)
local function make(class, props, children)
	local o = Instance.new(class)
	for k, v in pairs(props) do o[k] = v end
	for _, c in ipairs(children or {}) do c.Parent = o end
	return o
end
local function corner(r) return make("UICorner", { CornerRadius = UDim.new(0, r) }) end
local function stroke(col) return make("UIStroke", { Color = col or C.line, Thickness = 1, ApplyStrokeMode = Enum.ApplyStrokeMode.Border }) end

local gui = make("ScreenGui", { Name = "EmorceKey", ResetOnSpawn = false, IgnoreGuiInset = true, ZIndexBehavior = Enum.ZIndexBehavior.Sibling, DisplayOrder = 1000 })
local parentOk = pcall(function() gui.Parent = (gethui and gethui()) or game:GetService("CoreGui") end)
if not parentOk or not gui.Parent then gui.Parent = LP:WaitForChild("PlayerGui") end
env.__EmorceKeyWindow = gui

local BASE_W, BASE_H = 400, 270
local holder = make("Frame", { AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = UDim2.fromOffset(BASE_W, BASE_H), BackgroundTransparency = 1, Parent = gui })
local fitScale = make("UIScale", { Parent = holder })
local card = make("Frame", { AnchorPoint = Vector2.new(0.5, 0.5), Position = UDim2.fromScale(0.5, 0.5), Size = UDim2.fromScale(1, 1), BackgroundColor3 = C.card, Parent = holder }, { corner(12), stroke() })
local scale = make("UIScale", { Scale = 0.94, Parent = card })
local cam = workspace.CurrentCamera
local function fit()
	local vp = cam and cam.ViewportSize or Vector2.new(1280, 720)
	local s = math.min((vp.X - 24) / BASE_W, (vp.Y - 24) / BASE_H, 1.35)
	fitScale.Scale = math.max(s, 0.55)
end
fit()
if cam then cam:GetPropertyChangedSignal("ViewportSize"):Connect(fit) end

local logo = make("TextLabel", { Position = UDim2.fromOffset(20, 18), Size = UDim2.fromOffset(28, 28), BackgroundColor3 = C.field, Text = "E", TextColor3 = C.text, FontFace = FONT_BOLD, TextSize = 14, Parent = card }, { corner(7) })
task.spawn(function()
	local getAsset = getcustomasset or getsynasset
	if not (getAsset and writefile and isfile) then return end
