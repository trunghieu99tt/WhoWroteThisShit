import * as React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import cs from 'classnames';
import { useRouter } from 'next/router';
import { useSearchParam } from 'react-use';
import BodyClassName from 'react-body-classname';
import useDarkMode from 'use-dark-mode';
import { PageBlock } from 'notion-types';

// core notion renderer
import {
    NotionRenderer,
    Code,
    Collection,
    CollectionRow
} from 'react-notion-x';

// utils
import { getBlockTitle } from 'notion-utils';
import { mapPageUrl, getCanonicalPageUrl } from 'lib/map-page-url';
import { mapNotionImageUrl } from 'lib/map-image-url';
import { getPageDescription } from 'lib/get-page-description';
import { searchNotion } from 'lib/search-notion';
import * as types from 'lib/types';
import * as config from 'lib/config';

// components
import { CustomFont } from './CustomFont';
import Loading from './Loading';
import PageHead from './PageHead';
import Footer from './Footer';
import ShareButton from './ShareButton';
import ErrorPage from 'pages/404';
import Comment from './Comment';
import BlogHeader from './BlogHeader';

// const Code = dynamic(() =>
//   import('react-notion-x').then((notion) => notion.Code)
// )
//
// const Collection = dynamic(() =>
//   import('react-notion-x').then((notion) => notion.Collection)
// )
//
// const CollectionRow = dynamic(
//   () => import('react-notion-x').then((notion) => notion.CollectionRow),
//   {
//     ssr: false
//   }
// )

const Pdf = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Pdf)
);

const Equation = dynamic(() =>
    import('react-notion-x').then((notion) => notion.Equation)
);

// we're now using a much lighter-weight tweet renderer react-static-tweets
// instead of the official iframe-based embed widget from twitter
// const Tweet = dynamic(() => import('react-tweet-embed'))

const Modal = dynamic(
    () => import('react-notion-x').then((notion) => notion.Modal),
    { ssr: false }
);

export const NotionPage: React.FC<types.PageProps> = ({
    site,
    recordMap,
    error,
    pageId,
    post
}) => {
    const router = useRouter();
    const lite = useSearchParam('lite');

    const params: any = {};
    if (lite) params.lite = lite;

    // lite mode is for oembed
    const isLiteMode = lite === 'true';
    const searchParams = new URLSearchParams(params);

    const darkMode = useDarkMode(false, { classNameDark: 'dark-mode' });

    if (router.isFallback) {
        return <Loading />;
    }

    const keys = Object.keys(recordMap?.block || {});
    const block = recordMap?.block?.[keys[0]]?.value;

    if (error || !site || !keys.length || !block) {
        return <ErrorPage site={site} pageId={pageId} error={error} />;
    }

    const title = getBlockTitle(block, recordMap) || site.name;

    if (!config.isServer) {
        // add important objects to the window global for easy debugging
        const g = window as any;
        g.pageId = pageId;
        g.recordMap = recordMap;
        g.block = block;
    }

    const siteMapPageUrl = mapPageUrl(site, recordMap, searchParams);

    const canonicalPageUrl =
        !config.isDev && getCanonicalPageUrl(site, recordMap)(pageId);

    // const isRootPage =
    //   parsePageId(block.id) === parsePageId(site.rootNotionPageId)
    const isBlogPost =
        block.type === 'page' && block.parent_table === 'collection';
    const showTableOfContents = !!isBlogPost;
    const minTableOfContentsItems = 3;

    const socialImage = mapNotionImageUrl(
        (block as PageBlock).format?.page_cover || config.defaultPageCover,
        block
    );

    const socialDescription =
        getPageDescription(block, recordMap) ?? config.description;

    let pageAside: React.ReactChild =
        (isBlogPost && (
            <ShareButton
                title={title}
                url={getCanonicalPageUrl(site, recordMap)(pageId)}
            />
        )) ||
        null;

    // only display comments and page actions on blog post pages
    const comments = isBlogPost && config?.utterancesGitHubRepo && (
        <Comment
            repo={config.utterancesGitHubRepo}
            issueMap='issue-term'
            issueTerm='title'
            theme={darkMode.value ? 'photon-dark' : 'github-light'}
        />
    );

    return (
        <React.Fragment>
            <PageHead
                site={site}
                title={title}
                socialDescription={socialDescription}
                canonicalPageUrl={canonicalPageUrl}
                socialImage={socialImage}
            />

            <CustomFont site={site} />

            {isLiteMode && <BodyClassName className='notion-lite' />}

            <NotionRenderer
                bodyClassName={pageId === site.rootNotionPageId && 'index-page'}
                components={{
                    pageLink: ({
                        href,
                        as,
                        passHref,
                        prefetch,
                        replace,
                        scroll,
                        shallow,
                        locale,
                        ...props
                    }) => {
                        const omittedCoverProps = {
                            ...props,
                            children: [props.children[1]]
                        };
                        return (
                            <Link
                                href={href}
                                as={as}
                                passHref={passHref}
                                prefetch={prefetch}
                                replace={replace}
                                scroll={scroll}
                                shallow={shallow}
                                locale={locale}
                                {...omittedCoverProps}
                            ></Link>
                        );
                    },
                    code: Code,
                    collection: Collection,
                    collectionRow: CollectionRow,
                    modal: Modal,
                    pdf: Pdf,
                    equation: Equation
                }}
                pageHeader={post && <BlogHeader post={post} />}
                recordMap={recordMap}
                rootPageId={site.rootNotionPageId}
                fullPage={!isLiteMode}
                darkMode={darkMode.value}
                previewImages={site.previewImages !== false}
                showCollectionViewDropdown={false}
                showTableOfContents={showTableOfContents}
                minTableOfContentsItems={minTableOfContentsItems}
                defaultPageIcon={config.defaultPageIcon}
                defaultPageCover={config.defaultPageCover}
                defaultPageCoverPosition={config.defaultPageCoverPosition}
                mapPageUrl={siteMapPageUrl}
                mapImageUrl={mapNotionImageUrl}
                // searchNotion={searchNotion}
                pageFooter={comments}
                pageAside={pageAside}
                footer={
                    <Footer
                        isDarkMode={darkMode.value}
                        toggleDarkMode={darkMode.toggle}
                    />
                }
            />
        </React.Fragment>
    );
};
