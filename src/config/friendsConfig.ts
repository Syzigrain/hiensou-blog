import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

// 友链页面配置
export const friendsPageConfig: FriendsPageConfig = {
	// 页面标题，如果留空则使用 i18n 中的翻译
	title: "",

	// 页面描述文本，如果留空则使用 i18n 中的翻译
	description: "",

	// 是否显示底部自定义内容（friends.mdx 中的内容）
	showCustomContent: false,

	// 是否显示评论区，需要先在commentConfig.ts启用评论系统
	showComment: false,

	// 是否开启随机排序配置，如果开启，就会忽略权重，构建时进行一次随机排序
	randomizeSort: false,
};

// 友链配置
export const friendsConfig: FriendLink[] = [
	// 这里放你自己的友链。字段说明：
	//   title    站点名称
	//   imgurl   头像/站点图 URL
	//   desc     一句话简介
	//   siteurl  站点地址
	//   tags     标签数组
	//   weight   权重，数字越大排序越靠前
	//   enabled  是否启用
	//
	// 示例（去掉注释即可生效）：
	// {
	// 	title: "某某的博客",
	// 	imgurl: "https://example.com/avatar.jpg",
	// 	desc: "一句话简介",
	// 	siteurl: "https://example.com",
	// 	tags: ["Blog"],
	// 	weight: 10,
	// 	enabled: true,
	// },
];

// 获取启用的友链并进行排序
export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
