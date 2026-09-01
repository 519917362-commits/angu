// Admin panel bilingual labels (Simplified Chinese / English)

export const T = {
  // Navigation
  nav: {
    inquiries: '询盘 Inquiries',
    products: '产品 Products',
    categories: '产品分类 Categories',
    'blog-categories': '博客分类 Blog Cats',
    blogs: '博客 Blog',
    'site-general': '站点综合 Site General',
    logs: '日志 Logs',
    users: '用户 Users',
    about: '关于页面 About Page',
    homepage: '首页配置 Home',
    'products-page': '产品页 Products',
    'blog-page': '博客页 Blog',
    'service-page': '服务页 Service',
    'contact-page': '联系页 Contact',
    'solutions-page': '方案页 Solutions',
    'noise-barrier': '声屏障落地页 Noise Barrier',
    backToSite: '← 返回站点 Back to Site',
    logout: '退出登录 Logout',
    brand: 'Angu Admin',
  },

  // Login
  login: {
    title: 'Angu Admin',
    username: '用户名 Username',
    password: '密码 Password',
    button: '登录 Login',
    loading: '登录中... Logging in...',
    failed: '登录失败 Login failed',
    networkError: '网络错误 Network error',
  },

  // Common actions
  actions: {
    add: '新增 Add',
    edit: '编辑 Edit',
    delete: '删除 Delete',
    save: '保存 Save',
    cancel: '取消 Cancel',
    search: '搜索 Search',
    filter: '筛选 Filter',
    reset: '重置 Reset',
    confirm: '确认 Confirm',
    expand: '展开 Expand',
    collapse: '收起 Collapse',
    preview: '预览 Preview',
    upload: '上传 Upload',
    view: '查看',
  },

  // Status
  status: {
    published: '已发布 Published',
    draft: '草稿 Draft',
    active: '启用 Active',
    inactive: '停用 Inactive',
    all: '全部 All',
  },

  // Products
  products: {
    title: '产品 Products',
    add: '+ 新增产品 + Add Product',
    editTitle: '编辑产品 Edit Product',
    newTitle: '新增产品 New Product',
    slug: '别名 Slug',
    category: '分类 Category',
    name: '名称 Name',
    shortDesc: '简短描述 Short Description',
    description: '详细描述 Description',
    price: '价格 Price',
    unit: '单位 Unit',
    moq: '最小起订量 MOQ',
    sortWeight: '排序权重 Sort Weight',
    status: '状态 Status',
    featured: '推荐 Featured',
    images: '产品图片 Images',
    specs: '规格参数 Specifications (JSON)',
    applications: '应用领域 Applications',
    seo: 'SEO',
    seoTitle: 'SEO 标题 SEO Title',
    seoKeywords: 'SEO 关键词 SEO Keywords',
    seoDesc: 'SEO 描述 SEO Description',
    locale: '语言 Locale',
    saveSuccess: '保存成功 Product saved',
    saveFailed: '保存失败 Failed to save product',
    deleteConfirm: '确认删除此产品？ Confirm delete this product?',
    deleteSuccess: '删除成功 Product deleted',
    noProducts: '暂无产品 No products yet',
    total: '共 {count} 个产品 {count} products total',
    url: '访问链接 Visit URL',
  },

  // Categories
  categories: {
    title: '产品分类 Categories',
    add: '+ 新增分类 + Add Category',
    name: '分类名称 Name',
    name_en: '英文名 English Name',
    name_zh: '中文名 Chinese Name',
    slug: '别名 Slug',
    sortWeight: '排序 Sort',
    status: '状态 Status',
    productCount: '产品数 Products',
    saveSuccess: '分类已保存 Category saved',
    deleteConfirm: '确认删除此分类？ Confirm delete this category?',
    noCategories: '暂无分类 No categories',
  },

  // Blog
  blog: {
    title: '博客 Blog',
    add: '+ 新增文章 + Add Post',
    editTitle: '编辑文章 Edit Post',
    newTitle: '新增文章 New Post',
    title_label: '标题 Title',
    slug: '别名 Slug',
    category: '分类 Category',
    excerpt: '摘要 Excerpt',
    content: '内容 Content',
    coverImage: '封面图 Cover Image',
    author: '作者 Author',
    date: '日期 Date',
    status: '状态 Status',
    featured: '推荐 Featured',
    locale: '语言 Locale',
    seoTitle: 'SEO 标题 SEO Title',
    seoKeywords: 'SEO 关键词 SEO Keywords',
    seoDesc: 'SEO 描述 SEO Description',
    saveSuccess: '文章已保存 Post saved',
    noPosts: '暂无文章 No posts',
  },

  // Blog Categories
  blogCats: {
    title: '博客分类 Blog Categories',
    add: '+ 新增分类 + Add Category',
    name: '分类名称 Name',
    name_en: '英文名 English Name',
    name_zh: '中文名 Chinese Name',
    slug: '别名 Slug',
    saveSuccess: '博客分类已保存 Blog category saved',
  },

  // Inquiries
  inquiries: {
    title: '询盘列表 Inquiries',
    name: '姓名 Name',
    company: '公司 Company',
    email: '邮箱 Email',
    phone: '电话 Phone',
    product: '产品 Product',
    quantity: '数量 Quantity',
    message: '留言 Message',
    status: '状态 Status',
    date: '时间 Date',
    noInquiries: '暂无询盘 No inquiries',
    pending: '待处理 Pending',
    replied: '已回复 Replied',
    closed: '已关闭 Closed',
    replyPlaceholder: '输入回复内容... Enter reply...',
    reply: '回复 Reply',
  },

  // Logs
  logs: {
    title: '操作日志 Logs',
    action: '操作 Action',
    target: '对象 Target',
    operator: '操作人 Operator',
    time: '时间 Time',
    noLogs: '暂无日志 No logs',
    clear: '清空日志 Clear Logs',
    clearConfirm: '确认清空所有日志？ This will delete all logs.',
  },

  // Users
  users: {
    title: '管理员账户 Admin Users',
    add: '+ 新增账户 + Add User',
    username: '用户名 Username',
    password: '密码 Password',
    role: '角色 Role',
    createdAt: '创建时间 Created',
    saveSuccess: '账户已保存 User saved',
    deleteConfirm: '确认删除此账户？ This cannot be undone.',
    noUsers: '暂无账户 No users',
  },

  // Settings
  settings: {
    title: '系统设置 Settings',
    siteName: '站点名称 Site Name',
    siteUrl: '站点地址 Site URL',
    save: '保存设置 Save Settings',
  },

  // Empty states
  empty: {
    noData: '暂无数据 No data',
    loading: '加载中... Loading...',
  },

  // Errors
  errors: {
    required: '必填项 This field is required',
    invalidJson: 'JSON 格式错误 Invalid JSON',
    network: '网络错误 Network error',
    unauthorized: '未授权，请重新登录 Unauthorized',
  },
} as const;

export type TabKey = 'inquiries' | 'products' | 'categories' | 'blog-categories' | 'blogs' | 'about' | 'homepage' | 'products-page' | 'blog-page' | 'service-page' | 'contact-page' | 'solutions-page' | 'noise-barrier' | 'site-general' | 'logs' | 'users';
