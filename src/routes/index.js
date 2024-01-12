import { routes } from "configs";

// Layouts
import { MainLayout, AuthLayout } from "layouts";

// Pages
import {
  HomePage,
  PostsListPage,
  PostDetailPage,
  CreatePostPage,
  AuthPage,
  AccountListPage,
  AccountDetailPage,
  BannerPage,
  ThemePage,
  ChatPage,
  NotPermissionPage,
  WorkerManagerPage,
  WorkerDetailPage,
  CategoryPage,
  CategoryDetailPage,
  AllChildCategoryPage,
  ChildCategoryDetailPage,
  CreateChildCategoryPage,
  CreateParentCategoryPage,
  AdminSuggestManagerPage,
  SuggestDetailPage,
  CreateSearchSuggestPage,
  AdminLanguageManagerPage,
  AdminCommunityManagerPage,
  AdminCommunityCreatePage,
  AdminCommunityDetailPage,
} from "pages";
import Company from "pages/Company";
import CompanyDetail from "pages/Company/CompanyDetail";
import EditMedia from "pages/Post/Media/EditMedia";
import CreateMedia from "pages/Post/Media/CreateMedia";
import Media from "pages/Post/Media/Media";
import SendMailPage from "pages/SendMail/SendMail";
import TemplateMain from "pages/Template";
import CompanyDescription from "pages/Template/CompanyDescription";
import CompanyDescriptionDetail from "pages/Template/CompanyDescription/CompanyDescriptionDetail";
import CreateCompanyDescription from "pages/Template/CompanyDescription/CreateCompanyDescription";
import JobDescription from "pages/Template/JobDescription";
import CreateJobDescription from "pages/Template/JobDescription/CreateJobDescription";
import JobDescriptionDetail from "pages/Template/JobDescription/JobDescriptionDetail";

// import UserPoint from "pages/UserPoint";
// import UserPointDetail from "pages/UserPoint/UserPointDetail";

const publicRoutes = [
  {
    path: "/",
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: routes.home,
    component: HomePage,
    layout: MainLayout,
  },
  {
    path: routes.postsList,
    component: PostsListPage,
    layout: MainLayout,
  },
  {
    path: routes.media,
    component: Media,
    layout: MainLayout,
  },
  {
    path: routes.mediaEdit,
    component: EditMedia,
    layout: MainLayout,
  },
  {
    path: routes.mediaCreate,
    component: CreateMedia,
    layout: MainLayout,
  },
  {
    path: routes.postDetail,
    component: PostDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.createPost,
    component: CreatePostPage,
    layout: MainLayout,
  },
  {
    path: routes.accountList,
    component: AccountListPage,
    layout: MainLayout,
  },
  {
    path: routes.accountDetail,
    component: AccountDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.banner,
    component: BannerPage,
    layout: MainLayout,
  },
  {
    path: routes.themeCategory,
    component: ThemePage,
    layout: MainLayout,
  },
  {
    path: routes.chat,
    component: ChatPage,
    layout: MainLayout,
  },
  {
    path: routes.notPermission,
    component: NotPermissionPage,
    layout: MainLayout,
  },
  {
    path: routes.workerManager,
    component: WorkerManagerPage,
    layout: MainLayout,
  },
  {
    path: routes.workerDetail,
    component: WorkerDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.auth,
    component: AuthPage,
    layout: AuthLayout,
  },
  {
    path: routes.category,
    component: CategoryPage,
    layout: MainLayout,
  },
  {
    path: routes.categoryDetail,
    component: CategoryDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.seeAllChildCategory,
    component: AllChildCategoryPage,
    layout: MainLayout,
  },
  {
    path: routes.childCategoryDetail,
    component: ChildCategoryDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.createChildCategory,
    component: CreateChildCategoryPage,
    layout: MainLayout,
  },
  {
    path: routes.createParentCategory,
    component: CreateParentCategoryPage,
    layout: MainLayout,
  },
  {
    path: routes.suggestDetail,
    component: SuggestDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.adminSuggestManager,
    component: AdminSuggestManagerPage,
    layout: MainLayout,
  },
  {
    path: routes.createSearchSuggest,
    component: CreateSearchSuggestPage,
    layout: MainLayout,
  },
  {
    path: routes.sendMail,
    component: SendMailPage,
    layout: MainLayout,
  },
  {
    path: routes.language,
    component: AdminLanguageManagerPage,
    layout: MainLayout,
  },
  {
    path: routes.communityManager,
    component: AdminCommunityManagerPage,
    layout: MainLayout,
  },
  {
    path: routes.createCommunity,
    component: AdminCommunityCreatePage,
    layout: MainLayout,
  },
  {
    path: routes.communityDetail,
    component: AdminCommunityDetailPage,
    layout: MainLayout,
  },
  {
    path: routes.company,
    component: Company,
    layout: MainLayout,
  },
  {
    path: routes.companyDetail,
    component: CompanyDetail,
    layout: MainLayout,
  },
  // {
  //   path: routes.point,
  //   component: UserPoint,
  //   layout: MainLayout,
  // },
  // {
  //   path: routes.pointDetail,
  //   component: UserPointDetail,
  //   layout: MainLayout,
  // },
  {
    path: routes.templateMain,
    component: TemplateMain,
    layout: MainLayout,
  },
  {
    path: routes.jobDescriptionTemplate,
    component: JobDescription,
    layout: MainLayout,
  },
  {
    path: routes.jobDescriptionTemplateDetail,
    component: JobDescriptionDetail,
    layout: MainLayout,
  },
  {
    path: routes.jobDescriptionTemplateCreate,
    component: CreateJobDescription,
    layout: MainLayout,
  },
  {
    path: routes.companyDescriptionTemplate,
    component: CompanyDescription,
    layout: MainLayout,
  },
  {
    path: routes.companyDescriptionTemplateDetail,
    component: CompanyDescriptionDetail,
    layout: MainLayout,
  },
  {
    path: routes.companyDescriptionTemplateCreate,
    component: CreateCompanyDescription,
    layout: MainLayout,
  },
];

export { publicRoutes };
