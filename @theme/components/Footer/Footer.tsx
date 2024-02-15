import * as React from "react";
import { useThemeConfig } from "@theme/hooks/useThemeConfig";
import { LanguagePicker } from "@theme/i18n/LanguagePicker";
import { useI18n, useTranslate } from "@portal/hooks";

import { useLocation } from "react-router-dom";

export function Footer(props) {
  const themeConfig = useThemeConfig();
  const { changeLanguage } = useI18n();
  const { pathname } = useLocation();
  const menu = themeConfig.footer?.items;
  const copyrightText = themeConfig.footer?.copyrightText;
  const pathPrefix = "";

  const footerItems = menu.map((item, index) => {
    return (
      <FooterColumns
        key={index}
        label={item.label}
        items={item.items}
        pathPrefix={pathPrefix}
      />
    );
  });

  const blogFooterData = getBlogFooterConfig();
  const blogFooterItems = [];
  for (const blogFooter of blogFooterData) {
    blogFooterItems.push(
      <FooterColumns
        key={blogFooter.index}
        label={blogFooter.label}
        items={blogFooter.items}
        pathPrefix={pathPrefix}
      />
    );
  }

  // Render a different footer for the Blog site.
  if (pathname.includes("blog")) {
    return (
      <>
        <FooterWrapper
          copyrightText={copyrightText}
          changeLanguage={changeLanguage}
        >
          {blogFooterItems}
        </FooterWrapper>
      </>
    );
  } else {
    return (
      <>
        <FooterWrapper
          copyrightText={copyrightText}
          changeLanguage={changeLanguage}
        >
          {footerItems}
        </FooterWrapper>
      </>
    );
  }
}

export function FooterColumns(props) {
  const { label, items, pathPrefix } = props;

  const footerGroups = items.map((item, index) => {
    const cls = item.external
      ? "footer-item footer-external-link"
      : "footer-item";
    let item_href = item.link;
    if (item_href && !item_href.match(/^https?:/)) {
      item_href = pathPrefix + item_href;
    }

    return (
      <a key={index} className={cls} href={item_href}>
        {item.label}
      </a>
    );
  });

  return (
    <div className="footer-column px-3 mb-5">
      <div>
        <h5>{label}</h5>
        <div>{footerGroups}</div>
      </div>
    </div>
  );
}

export function FooterWrapper(props) {
  const { copyrightText, changeLanguage } = props;

  return (
    <footer className="footer-wrapper">
      <div className="container-new">{props.children}</div>
      <section className="d-flex flex-row justify-content-between absolute-bottom-footer">
        <div className="copyright-license">{copyrightText}</div>
        <div className="language-menu">
          <LanguagePicker onChangeLanguage={changeLanguage} placement='top' />
        </div>
      </section>
    </footer>
  );
}

function getBlogFooterConfig() {
  const { translate } = useTranslate();

  return [
    {
      index: "0",
      label: translate("Learn"),
      type: "group",
      items: [
        {
          type: "link",
          fsPath: "about/index.page.tsx",
          label: translate("Overview"),
          link: "/about/",
        },
        {
          type: "link",
          fsPath: "about/uses.page.tsx",
          label: translate("Uses"),
          link: "/about/uses",
        },
        {
          type: "link",
          fsPath: "about/history.page.tsx",
          label: translate("History"),
          link: "/about/history",
        },
        {
          type: "link",
          fsPath: "about/impact.page.tsx",
          label: translate("Impact"),
          link: "/about/impact",
        },
        {
          type: "link",
          fsPath: "about/impact.page.tsx",
          label: translate("Carbon Calculator"),
          link: "/about/impact",
        },
      ],
    },
    {
      index: "1",
      label: translate("Explore"),
      type: "group",
      items: [
        {
          type: "link",
          fsPath: "/docs/introduction/crypto-wallets.md",
          label: translate("Wallets"),
          link: "/docs/introduction/crypto-wallets",
        },
        {
          type: "link",
          fsPath: "about/xrp.page.tsx",
          label: translate("Exchanges"),
          link: "/about/xrp",
        },
        {
          type: "link",
          fsPath: "about/uses.page.tsx",
          label: translate("Businesses"),
          link: "/about/uses",
        },
        {
          type: "link",
          fsPath: "",
          label: translate("Ledger Explorer"),
          link: "https://livenet.xrpl.org/",
        },
      ],
    },
    {
      index: "2",
      label: translate("Build"),
      type: "group",
      items: [
        {
          type: "link",
          fsPath: "/docs/tutorials/index.md",
          label: translate("Get Started"),
          link: "/docs/tutorials",
        },
        {
          type: "link",
          fsPath: "/docs/index.page.tsx",
          label: translate("Docs"),
          link: "/docs/",
        },
        {
          type: "link",
          fsPath: "/resources/dev-tools/index.page.tsx",
          label: translate("Dev Tools"),
          link: "/resources/dev-tools/",
        },
        {
          type: "link",
          fsPath: "/blog/index.page.tsx",
          label: translate("Dev Blog"),
          link: "/blog/",
        },
      ],
    },
    {
      index: "3",
      label: translate("Contribute"),
      type: "group",
      items: [
        {
          type: "link",
          fsPath: "/resources/contribute-code/index.md",
          label: translate("How to Contribute"),
          link: "/resources/contribute-code",
        },
        {
          type: "link",
          fsPath: "",
          label: translate("XRPL on Github"),
          link: "https://github.com/XRPLF/xrpl-dev-portal",
          external: true,
        },
      ],
    },
  ];
}
