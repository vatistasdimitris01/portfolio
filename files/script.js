(()=>{
    function t() {
        for (let e of document.querySelectorAll("[data-framer-original-sizes]")) {
            let i = e.getAttribute("data-framer-original-sizes");
            i === "" ? e.removeAttribute("sizes") : e.setAttribute("sizes", i),
            e.removeAttribute("data-framer-original-sizes")
        }
    }
    function s() {
        window.__framer_onRewriteBreakpoints = t
    }
    return s
}
)()()

"use strict";
var animator = (()=>{
    var E = Object.defineProperty;
    var le = Object.getOwnPropertyDescriptor;
    var de = Object.getOwnPropertyNames;
    var xe = Object.prototype.hasOwnProperty;
    var ye = (e,t)=>{
        for (var n in t)
            E(e, n, {
                get: t[n],
                enumerable: !0
            })
    }
      , ge = (e,t,n,r)=>{
        if (t && typeof t == "object" || typeof t == "function")
            for (let o of de(t))
                !xe.call(e, o) && o !== n && E(e, o, {
                    get: ()=>t[o],
                    enumerable: !(r = le(t, o)) || r.enumerable
                });
        return e
    }
    ;
    var Ae = e=>ge(E({}, "__esModule", {
        value: !0
    }), e);
    var Re = {};
    ye(Re, {
        animateAppearEffects: ()=>me,
        getActiveVariantHash: ()=>ce,
        spring: ()=>M,
        startOptimizedAppearAnimation: ()=>X
    });
    var H = e=>e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
    var C = "framerAppearId"
      , je = "data-" + H(C);
    var D = e=>e;
    var Z = D;
    var he = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
      , q = new Set(he);
    var z = (e,t,n)=>n > t ? t : n < e ? e : n;
    var B = e=>e * 1e3
      , O = e=>e / 1e3;
    function U(e, t) {
        return t ? e * (1e3 / t) : 0
    }
    var Te = 5;
    function W(e, t, n) {
        let r = Math.max(t - Te, 0);
        return U(n - e(r), t - r)
    }
    var $ = .001
      , be = .01
      , _ = 10
      , we = .05
      , ve = 1;
    function Q({duration: e=800, bounce: t=.25, velocity: n=0, mass: r=1}) {
        let o, a;
        Z(e <= B(_), "Spring duration must be 10 seconds or less");
        let i = 1 - t;
        i = z(we, ve, i),
        e = z(be, _, O(e)),
        i < 1 ? (o = p=>{
            let s = p * i
              , c = s * e
              , u = s - n
              , x = V(p, i)
              , l = Math.exp(-c);
            return $ - u / x * l
        }
        ,
        a = p=>{
            let c = p * i * e
              , u = c * n + n
              , x = Math.pow(i, 2) * Math.pow(p, 2) * e
              , l = Math.exp(-c)
              , y = V(Math.pow(p, 2), i);
            return (-o(p) + $ > 0 ? -1 : 1) * ((u - x) * l) / y
        }
        ) : (o = p=>{
            let s = Math.exp(-p * e)
              , c = (p - n) * e + 1;
            return -$ + s * c
        }
        ,
        a = p=>{
            let s = Math.exp(-p * e)
              , c = (n - p) * (e * e);
            return s * c
        }
        );
        let m = 5 / e
          , f = Me(o, a, m);
        if (e = B(e),
        isNaN(f))
            return {
                stiffness: 100,
                damping: 10,
                duration: e
            };
        {
            let p = Math.pow(f, 2) * r;
            return {
                stiffness: p,
                damping: i * 2 * Math.sqrt(r * p),
                duration: e
            }
        }
    }
    var Oe = 12;
    function Me(e, t, n) {
        let r = n;
        for (let o = 1; o < Oe; o++)
            r = r - e(r) / t(r);
        return r
    }
    function V(e, t) {
        return e * Math.sqrt(1 - t * t)
    }
    var Se = ["duration", "bounce"]
      , Pe = ["stiffness", "damping", "mass"];
    function J(e, t) {
        return t.some(n=>e[n] !== void 0)
    }
    function ke(e) {
        let t = {
            velocity: 0,
            stiffness: 100,
            damping: 10,
            mass: 1,
            isResolvedFromDuration: !1,
            ...e
        };
        if (!J(e, Pe) && J(e, Se)) {
            let n = Q(e);
            t = {
                ...t,
                ...n,
                mass: 1
            },
            t.isResolvedFromDuration = !0
        }
        return t
    }
    function M({keyframes: e, restDelta: t, restSpeed: n, ...r}) {
        let o = e[0]
          , a = e[e.length - 1]
          , i = {
            done: !1,
            value: o
        }
          , {stiffness: m, damping: f, mass: p, duration: s, velocity: c, isResolvedFromDuration: u} = ke({
            ...r,
            velocity: -O(r.velocity || 0)
        })
          , x = c || 0
          , l = f / (2 * Math.sqrt(m * p))
          , y = a - o
          , g = O(Math.sqrt(m / p))
          , v = Math.abs(y) < 5;
        n || (n = v ? .01 : 2),
        t || (t = v ? .005 : .5);
        let h;
        if (l < 1) {
            let d = V(g, l);
            h = A=>{
                let b = Math.exp(-l * g * A);
                return a - b * ((x + l * g * y) / d * Math.sin(d * A) + y * Math.cos(d * A))
            }
        } else if (l === 1)
            h = d=>a - Math.exp(-g * d) * (y + (x + g * y) * d);
        else {
            let d = g * Math.sqrt(l * l - 1);
            h = A=>{
                let b = Math.exp(-l * g * A)
                  , k = Math.min(d * A, 300);
                return a - b * ((x + l * g * y) * Math.sinh(k) + d * y * Math.cosh(k)) / d
            }
        }
        return {
            calculatedDuration: u && s || null,
            next: d=>{
                let A = h(d);
                if (u)
                    i.done = d >= s;
                else {
                    let b = x;
                    d !== 0 && (l < 1 ? b = W(h, d, A) : b = 0);
                    let k = Math.abs(b) <= n
                      , ue = Math.abs(a - A) <= t;
                    i.done = k && ue
                }
                return i.value = i.done ? a : A,
                i
            }
        }
    }
    var ee = e=>Array.isArray(e) && typeof e[0] == "number";
    var S = ([e,t,n,r])=>`cubic-bezier(${e}, ${t}, ${n}, ${r})`
      , te = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: S([0, .65, .55, 1]),
        circOut: S([.55, 0, 1, .45]),
        backIn: S([.31, .01, .66, -.59]),
        backOut: S([.33, 1.53, .69, .99])
    };
    function De(e) {
        return N(e) || te.easeOut
    }
    function N(e) {
        if (e)
            return ee(e) ? S(e) : Array.isArray(e) ? e.map(De) : te[e]
    }
    function L(e, t, n, {delay: r=0, duration: o=300, repeat: a=0, repeatType: i="loop", ease: m, times: f}={}) {
        let p = {
            [t]: n
        };
        f && (p.offset = f);
        let s = N(m);
        return Array.isArray(s) && (p.easing = s),
        e.animate(p, {
            delay: r,
            duration: o,
            easing: Array.isArray(s) ? "linear" : s,
            fill: "both",
            iterations: a + 1,
            direction: i === "reverse" ? "alternate" : "normal"
        })
    }
    var K = (e,t)=>`${e}: ${t}`;
    var T = new Map;
    var R;
    function ne(e, t, n, r) {
        let o = q.has(t) ? "transform" : t
          , a = K(e, o)
          , i = T.get(a);
        if (!i)
            return null;
        let {animation: m, startTime: f} = i
          , p = ()=>{
            if (T.delete(a),
            r)
                r.render(()=>r.render(()=>{
                    try {
                        m.cancel()
                    } catch {}
                }
                ));
            else
                try {
                    m.cancel()
                } catch {}
        }
        ;
        return f === null || window.HandoffComplete ? (p(),
        null) : (R === void 0 && (R = performance.now()),
        R - f || 0)
    }
    var I, w;
    function X(e, t, n, r, o) {
        if (window.HandoffComplete) {
            window.HandoffAppearAnimations = void 0;
            return
        }
        let a = e.dataset[C];
        if (!a)
            return;
        window.HandoffAppearAnimations = ne;
        let i = K(a, t);
        w || (w = L(e, t, [n[0], n[0]], {
            duration: 1e4,
            ease: "linear"
        }),
        T.set(i, {
            animation: w,
            startTime: null
        }),
        window.HandoffCancelAllAnimations || (window.HandoffCancelAllAnimations = ()=>{
            T.forEach(({animation: f})=>{
                f.cancel()
            }
            ),
            T.clear(),
            window.HandoffCancelAllAnimations = void 0
        }
        ));
        let m = ()=>{
            w.cancel();
            let f = L(e, t, n, r);
            I === void 0 && (I = performance.now()),
            f.startTime = I,
            T.set(i, {
                animation: f,
                startTime: I
            }),
            o && o(f)
        }
        ;
        w.ready ? w.ready.then(m).catch(D) : m()
    }
    var Y = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"]
      , Ve = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    }
      , Ke = {
        translateX: "px",
        translateY: "px",
        translateZ: "px",
        x: "px",
        y: "px",
        z: "px",
        perspective: "px",
        transformPerspective: "px",
        rotate: "deg",
        rotateX: "deg",
        rotateY: "deg"
    };
    function re(e, t) {
        let n = Ke[e];
        return !n || typeof t == "string" && t.endsWith(n) ? t : `${t}${n}`
    }
    function F(e) {
        return Y.includes(e)
    }
    var Ie = (e,t)=>Y.indexOf(e) - Y.indexOf(t);
    function oe({transform: e, transformKeys: t}, n, r) {
        let o = "";
        t.sort(Ie);
        for (let a of t)
            o += `${Ve[a] || a}(${e[a]}) `;
        return o = o.trim(),
        r ? o = r(e, o) : n && (o = "none"),
        o
    }
    function j(e, t) {
        let n = new Set(Object.keys(e));
        for (let r in t)
            n.add(r);
        return Array.from(n)
    }
    function G(e, t) {
        let n = t - e.length;
        if (n <= 0)
            return e;
        let r = new Array(n).fill(e[e.length - 1]);
        return e.concat(r)
    }
    var se = {
        duration: .001
    }
      , P = {
        opacity: 1,
        scale: 1,
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        x: 0,
        y: 0,
        z: 0,
        rotate: 0,
        rotateX: 0,
        rotateY: 0
    };
    function pe(e, t, n, r, o) {
        return n.delay && (n.delay *= 1e3),
        n.type === "spring" ? Ce(e, t, n, r, o) : Be(e, t, n, r, o)
    }
    function Ee(e, t, n) {
        let r = {}
          , o = 0
          , a = 0;
        for (let i of j(e, t)) {
            let m = e[i] ?? P[i]
              , f = t[i] ?? P[i];
            if (m === void 0 || f === void 0 || i !== "transformPerspective" && m === f)
                continue;
            i === "transformPerspective" && (r[i] = [m, f]);
            let p = $e(m, f, n)
              , {duration: s, keyframes: c} = p;
            s === void 0 || c === void 0 || (s > o && (o = s,
            a = c.length),
            r[i] = c)
        }
        return {
            keyframeValuesByProps: r,
            longestDuration: o,
            longestLength: a
        }
    }
    function Ce(e, t, n, r, o) {
        let a = {}
          , {keyframeValuesByProps: i, longestDuration: m, longestLength: f} = Ee(e, t, n);
        if (!f)
            return a;
        let p = {
            ease: "linear",
            duration: m,
            delay: n.delay
        }
          , s = o ? se : p
          , c = {};
        for (let[x,l] of Object.entries(i))
            F(x) ? c[x] = G(l, f) : a[x] = {
                keyframes: G(l, f),
                options: x === "opacity" ? p : s
            };
        let u = fe(c, r);
        return u && (a.transform = {
            keyframes: u,
            options: s
        }),
        a
    }
    function ze(e) {
        let {type: t, duration: n, ...r} = e;
        return {
            duration: n * 1e3,
            ...r
        }
    }
    function Be(e, t, n, r, o) {
        let a = ze(n);
        if (!a)
            return;
        let i = {}
          , m = o ? se : a
          , f = {};
        for (let s of j(e, t)) {
            let c = e[s] ?? P[s]
              , u = t[s] ?? P[s];
            c === void 0 || u === void 0 || s !== "transformPerspective" && c === u || (F(s) ? f[s] = [c, u] : i[s] = {
                keyframes: [c, u],
                options: s === "opacity" ? a : m
            })
        }
        let p = fe(f, r);
        return p && (i.transform = {
            keyframes: p,
            options: m
        }),
        i
    }
    var ie = new Map
      , ae = 10;
    function $e(e, t, n) {
        let {damping: r, stiffness: o, mass: a} = n
          , i = `${e}-${t}-${r}-${o}-${a}`
          , m = ie.get(i);
        if (m)
            return m;
        let f = [e, t]
          , p = M({
            ...n,
            keyframes: f
        })
          , s = {
            done: !1,
            value: f[0]
        }
          , c = []
          , u = 0;
        for (; !s.done && u < 1e4; )
            s = p.next(u),
            c.push(s.value),
            u += ae;
        f = c;
        let x = u - ae
          , y = {
            keyframes: f,
            duration: x,
            ease: "linear"
        };
        return ie.set(i, y),
        y
    }
    function fe(e, t) {
        let n = []
          , r = Object.values(e)[0]?.length;
        if (!r)
            return;
        let o = Object.keys(e);
        for (let a = 0; a < r; a++) {
            let i = {}
              , m = !0;
            for (let[p,s] of Object.entries(e)) {
                let c = s[a];
                m && (m = c === void 0 || c === P[p]),
                c !== void 0 && (i[p] = re(p, c))
            }
            let f = oe({
                transform: i,
                transformKeys: o
            }, m, t);
            n.push(f)
        }
        return n
    }
    function Ne(e, t) {
        if (!t)
            for (let n in e) {
                let r = e[n];
                return r?.legacy === !0 ? r : void 0
            }
    }
    function me(e, t, n, r, o, a) {
        for (let[i,m] of Object.entries(e)) {
            let f = a ? m[a] : void 0;
            if (f === null || !f && m.default === null)
                continue;
            let p = f ?? m.default ?? Ne(m, a);
            if (!p)
                continue;
            let {initial: s, animate: c, transformTemplate: u} = p;
            if (!s || !c)
                continue;
            let {transition: x, ...l} = c
              , y = pe(s, l, x, Le(u, r), o);
            if (!y)
                continue;
            let g = {}
              , v = {};
            for (let[h,d] of Object.entries(y))
                g[h] = d.keyframes,
                v[h] = d.options;
            t(`[${n}="${i}"]`, g, v)
        }
    }
    function Le(e, t) {
        if (!(!e || !t))
            return (n,r)=>e.replace(t, r)
    }
    function ce(e) {
        return e ? e.find(n=>n.mediaQuery ? window.matchMedia(n.mediaQuery).matches === !0 : !1)?.hash : void 0
    }
    return Ae(Re);
}
)();

(()=>{
    function s(r, n, t) {
        window.__framer_disable_appear_effects_optimization__ || !animator || requestAnimationFrame(()=>{
            performance.mark("framer-appear-start"),
            animator.animateAppearEffects(JSON.parse(window.__framer__appearAnimationsContent.text), (i,o,p)=>{
                let e = document.querySelector(i);
                if (e)
                    for (let[a,m] of Object.entries(o))
                        animator.startOptimizedAppearAnimation(e, a, m, p[a])
            }
            , r, n, t && window.matchMedia("(prefers-reduced-motion:reduce)").matches === !0, animator.getActiveVariantHash(JSON.parse(window.__framer__breakpoints.text))),
            performance.mark("framer-appear-end"),
            performance.measure("framer-appear", "framer-appear-start", "framer-appear-end")
        }
        )
    }
    return s
}
)()("data-framer-appear-id", "__Appear_Animation_Transform__", false)