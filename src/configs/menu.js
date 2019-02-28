const menu = [{
    "id": "menu-article",
    "text": "资讯管理",
    "icon": "&#xe616",
    "children": [{
            "link": "#",
            "text": "资讯管理",
            "dataHref": "login"
        },
        {
            "link": "#",
            "text": "新增资讯",
            "dataHref": "article-add.html",
            "onclick": "Hui_admin_tab(this)"
        },
        {
            "text": "二级菜单",
            "children": [{
                "link": "#",
                "text": "三级菜单",
                "dataHref": "_blank.html"
            }]
        }

    ]
}]
module.exports = menu