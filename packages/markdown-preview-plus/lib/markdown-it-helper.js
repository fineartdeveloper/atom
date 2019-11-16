"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const markdownItModule = require("markdown-it");
const twemoji = require("twemoji");
const path = require("path");
const util_1 = require("./util");
const lodash_1 = require("lodash");
function mathInline(tok) {
    return `<span class='math inline-math'><script type='math/tex'>${tok.content}</script></span>`;
}
function mathBlock(tok) {
    let attrs = tok.attrs && tok.attrs.map(([n, v]) => `${n}="${v}"`).join(' ');
    if (!attrs)
        attrs = '';
    else
        attrs = ' ' + attrs;
    return `<span class='math display-math'${attrs}><script type='math/tex; mode=display'>${tok.content}</script></span>`;
}
function addSourceMapData(token) {
    if (token.map && token.nesting >= 0) {
        token.attrSet('data-source-lines', `${token.map[0]} ${token.map[1]}`);
    }
    return token;
}
function recurseTokens(fn) {
    const rf = function (token) {
        if (token.children)
            token.children = token.children.map(rf);
        fn(token);
        return token;
    };
    return rf;
}
function sourceLineData(md) {
    md.core.ruler.push('logger', function (state) {
        if (!state.env.sourceMap)
            return state;
        state.tokens = state.tokens.map(recurseTokens(addSourceMapData));
        return state;
    });
}
function getOptions(breaks) {
    return {
        html: true,
        xhtmlOut: false,
        breaks,
        langPrefix: 'lang-',
        linkify: true,
        typographer: true,
    };
}
function currentConfig(rL) {
    const config = util_1.atomConfig().markdownItConfig;
    return {
        renderLaTeX: rL,
        lazyHeaders: config.useLazyHeaders,
        checkBoxes: config.useCheckBoxes,
        toc: config.useToc,
        emoji: config.useEmoji,
        breaks: config.breakOnSingleNewline,
        criticMarkup: config.useCriticMarkup,
        footnote: config.useFootnote,
        imsize: config.useImsize,
        inlineMathSeparators: config.inlineMathSeparators,
        blockMathSeparators: config.blockMathSeparators,
        forceFullToc: config.forceFullToc,
        tocDepth: config.tocDepth,
    };
}
function init(initState) {
    const markdownIt = markdownItModule(getOptions(initState.breaks));
    if (initState.renderLaTeX) {
        const inlineDelim = util_1.pairUp(initState.inlineMathSeparators, 'inlineMathSeparators');
        const blockDelim = util_1.pairUp(initState.blockMathSeparators, 'blockMathSeparators');
        markdownIt.use(require('./markdown-it-math').math_plugin, {
            inlineDelim,
            blockDelim,
            inlineRenderer: mathInline,
            blockRenderer: mathBlock,
        });
    }
    markdownIt.use(sourceLineData);
    if (initState.lazyHeaders)
        markdownIt.use(require('markdown-it-lazy-headers'));
    if (initState.checkBoxes)
        markdownIt.use(require('markdown-it-task-lists'));
    if (initState.toc) {
        markdownIt.use(require('markdown-it-anchor'));
        markdownIt.use(require('markdown-it-table-of-contents'), {
            includeLevel: Array.from({ length: initState.tocDepth }, (_, i) => i + 1),
            forceFullToc: initState.forceFullToc,
        });
    }
    if (initState.emoji) {
        markdownIt.use(require('markdown-it-emoji'));
        markdownIt.renderer.rules.emoji = function (token, idx) {
            return twemoji.parse(token[idx].content, {
                folder: path.join('assets', 'svg'),
                ext: '.svg',
                base: path.dirname(require.resolve('twemoji-assets')) + path.sep,
            });
        };
    }
    if (initState.criticMarkup) {
        markdownIt.use(require('./markdown-it-criticmarkup'));
    }
    if (initState.footnote) {
        markdownIt.use(require('markdown-it-footnote'));
    }
    if (initState.imsize)
        markdownIt.use(require('markdown-it-imsize'));
    return markdownIt;
}
function wrapInitIfNeeded(initf) {
    let markdownIt = null;
    let initState = null;
    return function (newState) {
        if (markdownIt === null || !lodash_1.isEqual(initState, newState)) {
            initState = newState;
            markdownIt = initf(newState);
        }
        return markdownIt;
    };
}
const initIfNeeded = wrapInitIfNeeded(init);
function render(text, rL) {
    const markdownIt = initIfNeeded(currentConfig(rL));
    return markdownIt.render(text);
}
exports.render = render;
function getTokens(text, rL) {
    const markdownIt = initIfNeeded(currentConfig(rL));
    return markdownIt.render(text, { sourceMap: true });
}
exports.getTokens = getTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24taXQtaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcmtkb3duLWl0LWhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGdEQUFnRDtBQUVoRCxtQ0FBa0M7QUFDbEMsNkJBQTRCO0FBQzVCLGlDQUEyQztBQUMzQyxtQ0FBZ0M7QUFJaEMsU0FBUyxVQUFVLENBQUMsR0FBVTtJQUM1QixPQUFPLDBEQUEwRCxHQUFHLENBQUMsT0FBTyxrQkFBa0IsQ0FBQTtBQUNoRyxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBVTtJQUMzQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzNFLElBQUksQ0FBQyxLQUFLO1FBQUUsS0FBSyxHQUFHLEVBQUUsQ0FBQTs7UUFDakIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUE7SUFDeEIsT0FBTyxrQ0FBa0MsS0FBSywwQ0FBMEMsR0FBRyxDQUFDLE9BQU8sa0JBQWtCLENBQUE7QUFDdkgsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsS0FBWTtJQUNwQyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUU7UUFDbkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7S0FDdEU7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxFQUF1QjtJ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OlsiaW1wb3J0IG1hcmtkb3duSXRNb2R1bGUgPSByZXF1aXJlKCdtYXJrZG93bi1pdCcpXG5pbXBvcnQgVG9rZW4gPSByZXF1aXJlKCdtYXJrZG93bi1pdC9saWIvdG9rZW4nKVxuaW1wb3J0ICogYXMgdHdlbW9qaSBmcm9tICd0d2Vtb2ppJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgcGFpclVwLCBhdG9tQ29uZmlnIH0gZnJvbSAnLi91dGlsJ1xuaW1wb3J0IHsgaXNFcXVhbCB9IGZyb20gJ2xvZGFzaCdcblxudHlwZSBJbml0U3RhdGUgPSBSZWFkb25seTxSZXR1cm5UeXBlPHR5cGVvZiBjdXJyZW50Q29uZmlnPj5cblxuZnVuY3Rpb24gbWF0aElubGluZSh0b2s6IFRva2VuKSB7XG4gIHJldHVybiBgPHNwYW4gY2xhc3M9J21hdGggaW5saW5lLW1hdGgnPjxzY3JpcHQgdHlwZT0nbWF0aC90ZXgnPiR7dG9rLmNvbnRlbnR9PC9zY3JpcHQ+PC9zcGFuPmBcbn1cblxuZnVuY3Rpb24gbWF0aEJsb2NrKHRvazogVG9rZW4pIHtcbiAgbGV0IGF0dHJzID0gdG9rLmF0dHJzICYmIHRvay5hdHRycy5tYXAoKFtuLCB2XSkgPT4gYCR7bn09XCIke3Z9XCJgKS5qb2luKCcgJylcbiAgaWYgKCFhdHRycykgYXR0cnMgPSAnJ1xuICBlbHNlIGF0dHJzID0gJyAnICsgYXR0cnNcbiAgcmV0dXJuIGA8c3BhbiBjbGFzcz0nbWF0aCBkaXNwbGF5LW1hdGgnJHthdHRyc30+PHNjcmlwdCB0eXBlPSdtYXRoL3RleDsgbW9kZT1kaXNwbGF5Jz4ke3Rvay5jb250ZW50fTwvc2NyaXB0Pjwvc3Bhbj5gXG59XG5cbmZ1bmN0aW9uIGFkZFNvdXJjZU1hcERhdGEodG9rZW46IFRva2VuKSB7XG4gIGlmICh0b2tlbi5tYXAgJiYgdG9rZW4ubmVzdGluZyA+PSAwKSB7XG4gICAgdG9rZW4uYXR0clNldCgnZGF0YS1zb3VyY2UtbGluZXMnLCBgJHt0b2tlbi5tYXBbMF19ICR7dG9rZW4ubWFwWzFdfWApXG4gIH1cbiAgcmV0dXJuIHRva2VuXG59XG5cbmZ1bmN0aW9uIHJlY3Vyc2VUb2tlbnMoZm46ICh0OiBUb2tlbikgPT4gVG9rZW4pIHtcbiAgY29uc3QgcmYgPSBmdW5jdGlvbih0b2tlbjogVG9rZW4pIHtcbiAgICBpZiAodG9rZW4uY2hpbGRyZW4pIHRva2VuLmNoaWxkcmVuID0gdG9rZW4uY2hpbGRyZW4ubWFwKHJmKVxuICAgIGZuKHRva2VuKVxuICAgIHJldHVybiB0b2tlblxuICB9XG4gIHJldHVybiByZlxufVxuXG5mdW5jdGlvbiBzb3VyY2VMaW5lRGF0YShtZDogbWFya2Rvd25JdE1vZHVsZSkge1xuICBtZC5jb3JlLnJ1bGVyLnB1c2goJ2xvZ2dlcicsIGZ1bmN0aW9uKHN0YXRlOiBhbnkpOiBhbnkge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tdW5zYWZlLWFueVxuICAgIGlmICghc3RhdGUuZW52LnNvdXJjZU1hcCkgcmV0dXJuIHN0YXRlXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby11bnNhZmUtYW55XG4gICAgc3RhdGUudG9rZW5zID0gc3RhdGUudG9rZW5zLm1hcChyZWN1cnNlVG9rZW5zKGFkZFNvdXJjZU1hcERhdGEpKVxuICAgIHJldHVybiBzdGF0ZVxuICB9KVxufVxuXG5mdW5jdGlvbiBnZXRPcHRpb25zKGJyZWFrczogYm9vbGVhbikge1xuICByZXR1cm4ge1xuICAgIGh0bWw6IHRydWUsXG4gICAgeGh0bWxPdXQ6IGZhbHNlLFxuICAgIGJyZWFrcyxcbiAgICBsYW5nUHJlZml4OiAnbGFuZy0nLFxuICAgIGxpbmtpZnk6IHRydWUsXG4gICAgdHlwb2dyYXBoZXI6IHRydWUsXG4gIH1cbn1cblxuZnVuY3Rpb24gY3VycmVudENvbmZpZyhyTDogYm9vbGVhbikge1xuICBjb25zdCBjb25maWcgPSBhdG9tQ29uZmlnKCkubWFya2Rvd25JdENvbmZpZ1xuICByZXR1cm4ge1xuICAgIHJlbmRlckxhVGVYOiByTCxcbiAgICBsYXp5SGVhZGVyczogY29uZmlnLnVzZUxhenlIZWFkZXJzLFxuICAgIGNoZWNrQm94ZXM6IGNvbmZpZy51c2VDaGVja0JveGVzLFxuICAgIHRvYzogY29uZmlnLnVzZVRvYyxcbiAgICBlbW9qaTogY29uZmlnLnVzZUVtb2ppLFxuICAgIGJyZWFrczogY29uZmlnLmJyZWFrT25TaW5nbGVOZXdsaW5lLFxuICAgIGNyaXRpY01hcmt1cDogY29uZmlnLnVzZUNyaXRpY01hcmt1cCxcbiAgICBmb290bm90ZTogY29uZmlnLnVzZUZvb3Rub3RlLFxuICAgIGltc2l6ZTogY29uZmlnLnVzZUltc2l6ZSxcbiAgICBpbmxpbmVNYXRoU2VwYXJhdG9yczogY29uZmlnLmlubGluZU1hdGhTZXBhcmF0b3JzLFxuICAgIGJsb2NrTWF0aFNlcGFyYXRvcnM6IGNvbmZpZy5ibG9ja01hdGhTZXBhcmF0b3JzLFxuICAgIGZvcmNlRnVsbFRvYzogY29uZmlnLmZvcmNlRnVsbFRvYyxcbiAgICB0b2NEZXB0aDogY29uZmlnLnRvY0RlcHRoLFxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoaW5pdFN0YXRlOiBJbml0U3RhdGUpOiBtYXJrZG93bkl0TW9kdWxlIHtcbiAgY29uc3QgbWFya2Rvd25JdCA9IG1hcmtkb3duSXRNb2R1bGUoZ2V0T3B0aW9ucyhpbml0U3RhdGUuYnJlYWtzKSlcblxuICBpZiAoaW5pdFN0YXRlLnJlbmRlckxhVGVYKSB7XG4gICAgY29uc3QgaW5saW5lRGVsaW0gPSBwYWlyVXAoXG4gICAgICBpbml0U3RhdGUuaW5saW5lTWF0aFNlcGFyYXRvcnMsXG4gICAgICAnaW5saW5lTWF0aFNlcGFyYXRvcnMnLFxuICAgIClcbiAgICBjb25zdCBibG9ja0RlbGltID0gcGFpclVwKFxuICAgICAgaW5pdFN0YXRlLmJsb2NrTWF0aFNlcGFyYXRvcnMsXG4gICAgICAnYmxvY2tNYXRoU2VwYXJhdG9ycycsXG4gICAgKVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby11bnNhZmUtYW55XG4gICAgbWFya2Rvd25JdC51c2UocmVxdWlyZSgnLi9tYXJrZG93bi1pdC1tYXRoJykubWF0aF9wbHVnaW4sIHtcbiAgICAgIGlubGluZURlbGltLFxuICAgICAgYmxvY2tEZWxpbSxcbiAgICAgIGlubGluZVJlbmRlcmVyOiBtYXRoSW5saW5lLFxuICAgICAgYmxvY2tSZW5kZXJlcjogbWF0aEJsb2NrLFxuICAgIH0pXG4gIH1cblxuICBtYXJrZG93bkl0LnVzZShzb3VyY2VMaW5lRGF0YSlcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZTpuby11bnNhZmUtYW55XG4gIGlmIChpbml0U3RhdGUubGF6eUhlYWRlcnMpIG1hcmtkb3duSXQudXNlKHJlcXVpcmUoJ21hcmtkb3duLWl0LWxhenktaGVhZGVycycpKVxuICBpZiAoaW5pdFN0YXRlLmNoZWNrQm94ZXMpIG1hcmtkb3duSXQudXNlKHJlcXVpcmUoJ21hcmtkb3duLWl0LXRhc2stbGlzdHMnKSlcbiAgaWYgKGluaXRTdGF0ZS50b2MpIHtcbiAgICBtYXJrZG93bkl0LnVzZShyZXF1aXJlKCdtYXJrZG93bi1pdC1hbmNob3InKSlcbiAgICBtYXJrZG93bkl0LnVzZShyZXF1aXJlKCdtYXJrZG93bi1pdC10YWJsZS1vZi1jb250ZW50cycpLCB7XG4gICAgICBpbmNsdWRlTGV2ZWw6IEFycmF5LmZyb20oeyBsZW5ndGg6IGluaXRTdGF0ZS50b2NEZXB0aCB9LCAoXywgaSkgPT4gaSArIDEpLFxuICAgICAgZm9yY2VGdWxsVG9jOiBpbml0U3RhdGUuZm9yY2VGdWxsVG9jLFxuICAgIH0pXG4gIH1cblxuICBpZiAoaW5pdFN0YXRlLmVtb2ppKSB7XG4gICAgbWFya2Rvd25JdC51c2UocmVxdWlyZSgnbWFya2Rvd24taXQtZW1vamknKSlcbiAgICBtYXJrZG93bkl0LnJlbmRlcmVyLnJ1bGVzLmVtb2ppID0gZnVuY3Rpb24odG9rZW4sIGlkeCkge1xuICAgICAgcmV0dXJuIHR3ZW1vamkucGFyc2UodG9rZW5baWR4XS5jb250ZW50LCB7XG4gICAgICAgIGZvbGRlcjogcGF0aC5qb2luKCdhc3NldHMnLCAnc3ZnJyksXG4gICAgICAgIGV4dDogJy5zdmcnLFxuICAgICAgICBiYXNlOiBwYXRoLmRpcm5hbWUocmVxdWlyZS5yZXNvbHZlKCd0d2Vtb2ppLWFzc2V0cycpKSArIHBhdGguc2VwLFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBpZiAoaW5pdFN0YXRlLmNyaXRpY01hcmt1cCkge1xuICAgIG1hcmtkb3duSXQudXNlKHJlcXVpcmUoJy4vbWFya2Rvd24taXQtY3JpdGljbWFya3VwJykpXG4gIH1cbiAgaWYgKGluaXRTdGF0ZS5mb290bm90ZSkge1xuICAgIG1hcmtkb3duSXQudXNlKHJlcXVpcmUoJ21hcmtkb3duLWl0LWZvb3Rub3RlJykpXG4gIH1cbiAgaWYgKGluaXRTdGF0ZS5pbXNpemUpIG1hcmtkb3duSXQudXNlKHJlcXVpcmUoJ21hcmtkb3duLWl0LWltc2l6ZScpKVxuICAvLyB0c2xpbnQ6ZW5hYmxlOm5vLXVuc2FmZS1hbnlcblxuICByZXR1cm4gbWFya2Rvd25JdFxufVxuXG5mdW5jdGlvbiB3cmFwSW5pdElmTmVlZGVkKGluaXRmOiB0eXBlb2YgaW5pdCk6IHR5cGVvZiBpbml0IHtcbiAgbGV0IG1hcmtkb3duSXQ6IG1hcmtkb3duSXRNb2R1bGUgfCBudWxsID0gbnVsbFxuICBsZXQgaW5pdFN0YXRlOiBJbml0U3RhdGUgfCBudWxsID0gbnVsbFxuXG4gIHJldHVybiBmdW5jdGlvbihuZXdTdGF0ZTogSW5pdFN0YXRlKSB7XG4gICAgaWYgKG1hcmtkb3duSXQgPT09IG51bGwgfHwgIWlzRXF1YWwoaW5pdFN0YXRlLCBuZXdTdGF0ZSkpIHtcbiAgICAgIGluaXRTdGF0ZSA9IG5ld1N0YXRlXG4gICAgICBtYXJrZG93bkl0ID0gaW5pdGYobmV3U3RhdGUpXG4gICAgfVxuICAgIHJldHVybiBtYXJrZG93bkl0XG4gIH1cbn1cblxuY29uc3QgaW5pdElmTmVlZGVkID0gd3JhcEluaXRJZk5lZWRlZChpbml0KVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHRleHQ6IHN0cmluZywgckw6IGJvb2xlYW4pIHtcbiAgY29uc3QgbWFya2Rvd25JdCA9IGluaXRJZk5lZWRlZChjdXJyZW50Q29uZmlnKHJMKSlcbiAgcmV0dXJuIG1hcmtkb3duSXQucmVuZGVyKHRleHQpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb2tlbnModGV4dDogc3RyaW5nLCByTDogYm9vbGVhbikge1xuICBjb25zdCBtYXJrZG93bkl0ID0gaW5pdElmTmVlZGVkKGN1cnJlbnRDb25maWcockwpKVxuICByZXR1cm4gbWFya2Rvd25JdC5yZW5kZXIodGV4dCwgeyBzb3VyY2VNYXA6IHRydWUgfSlcbn1cbiJdfQ==