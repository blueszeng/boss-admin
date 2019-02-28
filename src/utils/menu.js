function getFatherItemStr(item) {
    if (item['id']) {
        return `<dl id="${item['id']}" class="Hui-menu"><dt class="Hui-menu-title"><i class="Hui-iconfont">${item['icon']};</i> ${item['text']} <i class="Hui-iconfont Hui-admin-menu-dropdown-arrow">&#xe6d5;</i></dt><dd class="Hui-menu-item"><ul>`
    } else {
        return `<dl class="Hui-menu"><dt class="Hui-menu-title"></i> ${item['text']} <i class="Hui-iconfont Hui-admin-menu-dropdown-arrow">&#xe6d5;</i></dt><dd class="Hui-menu-item"><ul>`
    }
}

function getChildrenItemStr(item) {
    if (item['onclick']) {
        return `<li><a data-href="${item['dataHref']}" data-title="${item['text']}" onclick="${item['onclick']}" href="javascript:void(0)">${item['text']}</a></li>`
    } else {
        return `<li><a data-href="${item['dataHref']}" data-title="${item['text']}" href="javascript:void(0)">${item['text']}</a></li>`
    }
}

function generateMenu(menuList, value) {
    for (let i in menuList) {
        let menu = menuList[i];
        if (menu["children"]) {
            value.str += getFatherItemStr({ 'id': menu['id'], 'text': menu['text'], "icon": menu['icon'] })
            generateMenu(menu["children"], value)
            value.str += "</ul></dd></dl>"
        } else {
            value.str += getChildrenItemStr({ 'dataHref': menu['dataHref'], 'onclick': menu['onclick'], 'text': menu['text'] })
        }
    }
}

export default {
    generateMenu
}