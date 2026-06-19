// assets/content-map.js
// 站点内容分区与搜索模块

(function() {
    'use strict';

    const siteConfig = {
        baseUrl: 'https://cns-jcw.com',
        siteName: '竞彩网'
    };

    const contentSections = [
        {
            id: 'football',
            title: '足球赛事',
            keywords: ['竞彩网', '足球', '英超', '西甲', '德甲', '意甲', '法甲', '欧冠', '欧联'],
            items: [
                { name: '英超直播', path: '/football/premier-league' },
                { name: '西甲直播', path: '/football/la-liga' },
                { name: '欧冠专题', path: '/football/champions-league' }
            ]
        },
        {
            id: 'basketball',
            title: '篮球赛事',
            keywords: ['NBA', 'CBA', '篮球', '竞彩网'],
            items: [
                { name: 'NBA直播', path: '/basketball/nba' },
                { name: 'CBA直播', path: '/basketball/cba' }
            ]
        },
        {
            id: 'tennis',
            title: '网球赛事',
            keywords: ['网球', '大满贯', 'ATP', 'WTA'],
            items: [
                { name: '澳网', path: '/tennis/australian-open' },
                { name: '温网', path: '/tennis/wimbledon' }
            ]
        },
        {
            id: 'esports',
            title: '电子竞技',
            keywords: ['电竞', 'LOL', 'DOTA2', 'CSGO', '王者荣耀'],
            items: [
                { name: 'LPL联赛', path: '/esports/lpl' },
                { name: 'TI赛事', path: '/esports/the-international' }
            ]
        },
        {
            id: 'live',
            title: '直播大厅',
            keywords: ['直播', '竞彩网', '视频', '体育'],
            items: [
                { name: '今日直播', path: '/live/today' },
                { name: '热门回放', path: '/live/replay' }
            ]
        }
    ];

    /**
     * 根据关键词搜索内容分区
     * @param {string} query - 搜索关键词
     * @returns {Array} 匹配的分区及内容列表
     */
    function searchByKeyword(query) {
        if (!query || typeof query !== 'string') {
            return [];
        }

        const trimmedQuery = query.trim().toLowerCase();
        if (trimmedQuery.length === 0) {
            return [];
        }

        const matches = [];

        contentSections.forEach(section => {
            const sectionMatches = [];

            // 检查分区关键词
            const keywordMatch = section.keywords.some(kw =>
                kw.toLowerCase().includes(trimmedQuery) ||
                trimmedQuery.includes(kw.toLowerCase())
            );

            // 检查分区内项目名称
            const itemMatches = section.items.filter(item =>
                item.name.toLowerCase().includes(trimmedQuery)
            );

            if (keywordMatch || itemMatches.length > 0) {
                sectionMatches.push({
                    sectionId: section.id,
                    sectionTitle: section.title,
                    matchedItems: itemMatches.length > 0 ? itemMatches : section.items,
                    relevance: itemMatches.length > 0 ? 'high' : 'medium'
                });
            }

            matches.push(...sectionMatches);
        });

        // 按相关性排序
        matches.sort((a, b) => {
            const order = { 'high': 0, 'medium': 1, 'low': 2 };
            return order[a.relevance] - order[b.relevance];
        });

        return matches;
    }

    /**
     * 获取所有内容分区摘要
     * @returns {Array} 分区摘要列表
     */
    function getSectionSummary() {
        return contentSections.map(section => ({
            id: section.id,
            title: section.title,
            itemCount: section.items.length,
            keywords: section.keywords.slice(0, 3)
        }));
    }

    /**
     * 获取指定分区的完整信息
     * @param {string} sectionId - 分区ID
     * @returns {Object|null} 分区对象或null
     */
    function getSectionById(sectionId) {
        return contentSections.find(section => section.id === sectionId) || null;
    }

    // 暴露公共接口
    window.contentMap = {
        config: siteConfig,
        sections: contentSections,
        search: searchByKeyword,
        getSummary: getSectionSummary,
        getSection: getSectionById
    };

})();