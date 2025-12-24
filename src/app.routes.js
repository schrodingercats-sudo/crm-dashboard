"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var login_component_1 = require("./login.component");
var onboarding_component_1 = require("./onboarding.component");
var landing_component_1 = require("./landing.component");
var ideal_component_1 = require("./ideal.component");
var pricing_component_1 = require("./pricing.component");
var blog_component_1 = require("./blog.component");
var contact_component_1 = require("./contact.component");
var privacy_component_1 = require("./privacy.component");
var terms_component_1 = require("./terms.component");
var account_not_found_component_1 = require("./account-not-found.component");
var faq_page_component_1 = require("./faq-page.component");
var about_component_1 = require("./about.component");
var changelog_component_1 = require("./changelog.component");
var brand_component_1 = require("./brand.component");
var help_component_1 = require("./help.component");
var portal_login_component_1 = require("./portal/portal-login.component");
// Dashboard Imports
var dashboard_layout_component_1 = require("./dashboard-features/dashboard-layout.component");
var admin_dashboard_layout_component_1 = require("./dashboard-features/admin-dashboard-layout.component");
var user_dashboard_layout_component_1 = require("./dashboard-features/user-dashboard-layout.component");
var overview_component_1 = require("./dashboard-features/overview/overview.component");
var leads_component_1 = require("./dashboard-features/leads/leads.component");
var referral_partners_component_1 = require("./dashboard-features/referral-partners/referral-partners.component");
var deals_component_1 = require("./dashboard-features/deals/deals.component");
var integration_component_1 = require("./dashboard-features/integration/integration.component");
var tasks_component_1 = require("./dashboard-features/tasks/tasks.component");
var settings_component_1 = require("./dashboard-features/settings/settings.component");
var help_component_2 = require("./dashboard-features/help/help.component");
// Guards
var admin_guard_1 = require("./admin.guard");
var user_guard_1 = require("./user.guard");
var auth_guard_1 = require("./auth.guard");
exports.routes = [
    {
        path: '',
        component: landing_component_1.LandingComponent,
    },
    {
        path: 'ideal',
        component: ideal_component_1.IdealComponent,
    },
    {
        path: 'pricing',
        component: pricing_component_1.PricingComponent,
    },
    {
        path: 'blog',
        component: blog_component_1.BlogComponent,
    },
    {
        path: 'contact',
        component: contact_component_1.ContactComponent,
    },
    {
        path: 'privacy',
        component: privacy_component_1.PrivacyComponent,
    },
    {
        path: 'terms',
        component: terms_component_1.TermsComponent,
    },
    // Customer Portal Routes
    {
        path: 'portal',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: portal_login_component_1.PortalLoginComponent },
        ]
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
    },
    {
        path: 'onboarding',
        component: onboarding_component_1.OnboardingComponent,
    },
    {
        path: 'account-not-found',
        component: account_not_found_component_1.AccountNotFoundComponent,
    },
    {
        path: 'faq',
        component: faq_page_component_1.FaqPageComponent,
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent,
    },
    {
        path: 'changelog',
        component: changelog_component_1.ChangelogComponent,
    },
    {
        path: 'brand',
        component: brand_component_1.BrandComponent,
    },
    {
        path: 'help',
        component: help_component_1.HelpComponent,
    },
    // Admin Dashboard Routes
    {
        path: 'admin/dashboard',
        component: admin_dashboard_layout_component_1.AdminDashboardLayoutComponent,
        canActivate: [admin_guard_1.adminGuard],
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: overview_component_1.OverviewComponent },
            {
                path: 'contacts',
                children: [
                    { path: '', redirectTo: 'leads', pathMatch: 'full' },
                    { path: 'leads', component: leads_component_1.LeadsComponent },
                    { path: 'referral-partners', component: referral_partners_component_1.ReferralPartnersComponent }
                ]
            },
            { path: 'deals', component: deals_component_1.DealsComponent },
            { path: 'integration', component: integration_component_1.IntegrationComponent },
            { path: 'tasks', component: tasks_component_1.TasksComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'help', component: help_component_2.HelpComponent },
            // Fallback for invalid admin routes
            { path: '**', redirectTo: 'overview' }
        ]
    },
    // User Dashboard Routes
    {
        path: 'user/dashboard',
        component: user_dashboard_layout_component_1.UserDashboardLayoutComponent,
        canActivate: [user_guard_1.userGuard],
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: overview_component_1.OverviewComponent },
            { path: 'contacts', component: leads_component_1.LeadsComponent }, // Reusing LeadsComponent for user contacts
            { path: 'deals', component: deals_component_1.DealsComponent },
            { path: 'tasks', component: tasks_component_1.TasksComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'help', component: help_component_2.HelpComponent },
            // Fallback for invalid user routes
            { path: '**', redirectTo: 'overview' }
        ]
    },
    // Legacy Dashboard Routes (for backward compatibility)
    {
        path: 'dashboard',
        component: dashboard_layout_component_1.DashboardLayoutComponent,
        canActivate: [auth_guard_1.authGuard],
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: overview_component_1.OverviewComponent },
            {
                path: 'contacts',
                children: [
                    { path: '', redirectTo: 'leads', pathMatch: 'full' },
                    { path: 'leads', component: leads_component_1.LeadsComponent },
                    { path: 'referral-partners', component: referral_partners_component_1.ReferralPartnersComponent }
                ]
            },
            { path: 'deals', component: deals_component_1.DealsComponent },
            { path: 'integration', component: integration_component_1.IntegrationComponent },
            { path: 'tasks', component: tasks_component_1.TasksComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'help', component: help_component_2.HelpComponent },
            // Fallback for invalid legacy routes
            { path: '**', redirectTo: 'overview' }
        ]
    },
    // Error handling routes
    {
        path: 'error',
        children: [
            { path: 'access-denied', component: account_not_found_component_1.AccountNotFoundComponent },
            { path: 'network-error', component: account_not_found_component_1.AccountNotFoundComponent },
            { path: '**', redirectTo: '/error/access-denied' }
        ]
    },
    {
        path: '**',
        redirectTo: '',
    },
];
