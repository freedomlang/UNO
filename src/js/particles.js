    var __bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments)
        }
    };

    function Sphere(background_color, link_threshold, density, particles, canvas, effect_on) {
        this.background_color =  background_color || {
            h: 0,
            s: 0,
            l: 100,
            a: 1
        };
        this.link_threshold = link_threshold || 300;
        this.density = density || 20;
        this.particles = particles || null;
        this.effect_on = effect_on || true;
        this.animate = __bind(this.animate, this);
        this.init_canvas();
        this.init_size();
        this.init_particles();
        this.init_label();
        jQuery(window).resize(function(_this) {
            return function() {
                _this.init_size();
                return _this.init_particles()
            }
        }(this));
        this.init_mouse_event()
    }
    Sphere.prototype.animate = function() {
        if (!this.effect_on) {
            this.canvas.style.display = 'none';
            this.canvas.width = this.canvas.width;
            this.$label.css({
                visibility: "hidden"
            });
        }
        this.clear_bg();
        this.update_link();
        this.update_particles();
        return requestAnimationFrame(this.animate)
    };
    Sphere.prototype.init_canvas = function() {
        window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1000 / 60)
        };
        this.$canvas = jQuery('<canvas style="position: fixed; z-index: -10000; top: 0; left:0;"></canvas>');
        jQuery("body").prepend(this.$canvas);
        this.canvas = this.$canvas[0];
        this.context = this.canvas.getContext("2d");
    };
    Sphere.prototype.init_size = function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    };
    Sphere.prototype.init_mouse_event = function() {
        var $document;
        this.mouse = {
            x: Infinity,
            y: Infinity
        };
        $document = jQuery(document);
        $document.mousemove(function(_this) {
            return function(e) {
                _this.mouse.x = e.clientX;
                _this.mouse.y = e.clientY;
                _this.mouse.sx = e.pageX;
                return _this.mouse.sy = e.pageY
            }
        }(this));
        return $document.mouseleave(function(_this) {
            return function() {
                _this.mouse.x = Infinity;
                return _this.mouse.y = Infinity
            }
        }(this))
    };
    Sphere.prototype.init_particles = function() {
        var count, i, p, r, v_max, _i;
        this.particles = [];
        this.particle_pairs = [];
        count = this.width * this.height * (this.density / Math.pow(1e3, 2));
        r = 3;
        v_max = .3;
        for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
            p = new Particle(this, this.random(r, this.width - r), this.random(r, this.height - r), this.random(-v_max, v_max), this.random(-v_max, v_max), {
                h: this.random(0, 360),
                s: 30,
                l: 20,
                o: 1
            }, this.random(1, 3), ys.words[i < ys.words.length ? i : 0]);
            this.particles.push(p)
        }
        this.combinate(this.particles, 2, function(_this) {
            return function(c) {
                return _this.particle_pairs.push([c[0], c[1]])
            }
        }(this));
        return console.log("" + count + " particles created.")
    };
    Sphere.prototype.init_label = function() {
        this.$label = jQuery("<div></div>").css({
            fontSize: "12px",
            lineHeight: "150%",
            color: "#777",
            maxWidth: "400px",
            visibility: "hidden",
            opacity: .9,
            background: "#fff",
            borderRadius: "3px",
            position: "absolute"
        });
        return this.$canvas.after(this.$label)
    };
    Sphere.prototype.clear_bg = function() {
        this.context.fillStyle = this.hsla_str(this.background_color);
        return this.context.fillRect(0, 0, this.width, this.height)
    };
    Sphere.prototype.update_particles = function() {
        var d, is_text, p, _i, _len, _ref;
        is_text = false;
        _ref = this.particles;
        for (_i = 0,
            _len = _ref.length; _i < _len; _i++) {
            p = _ref[_i];
            d = this.distance(p, this.mouse);
            p.move(d);
            p.draw(d);
            if (p.is_text) {
                is_text = true
            }
        }
        if (!is_text) {
            return this.$label.css({
                visibility: "hidden"
            })
        }
    };
    Sphere.prototype.update_link = function() {
        var ctx, d, pairs, _i, _len, _ref, _results;
        ctx = this.context;
        _ref = this.particle_pairs;
        _results = [];
        for (_i = 0,
            _len = _ref.length; _i < _len; _i++) {
            pairs = _ref[_i];
            d = this.distance(pairs[0], pairs[1]);
            if (d < this.link_threshold) {
                this.link_color = pairs[0].color;
                this.link_color.a = (1 - d / this.link_threshold) * .2;
                ctx.beginPath();
                ctx.strokeStyle = this.hsla_str(this.link_color);
                ctx.lineWidth = 1;
                ctx.moveTo(pairs[0].x, pairs[0].y);
                ctx.lineTo(pairs[1].x, pairs[1].y);
                _results.push(ctx.stroke())
            } else {
                _results.push(void 0)
            }
        }
        return _results
    };
    Sphere.prototype.hsla_str = function(c) {
        return "hsla(" + c.h + ", " + c.s + "%, " + c.l + "%, " + c.a + ")"
    };
    Sphere.prototype.distance = function(p0, p1) {
        var d, dx, dy;
        dx = p0.x - p1.x;
        dy = p0.y - p1.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (isNaN(d)) {
            return 0;
        } else {
            return d;
        }
    };
    Sphere.prototype.random = function(min, max, is_int) {
        if (min === null) {
            min = 0;
        }
        if (max === null) {
            max = 1;
        }
        if (is_int === null) {
            is_int = false;
        }
        if (is_int) {
            return Math.round(Math.random() * (max - min) + min)
        } else {
            return Math.random() * (max - min) + min
        }
    };
    Sphere.prototype.combinate = function(numArr, choose, callback) {
        var n = numArr.length;
        var c = [];
        var inner = function(start, choose_) {
            if (choose_ == 0) {
                callback(c)
            } else {
                for (var i = start; i <= n - choose_; ++i) {
                    c.push(numArr[i]);
                    inner(i + 1, choose_ - 1);
                    c.pop()
                }
            }
        };
        inner(0, choose)
    };

    function Particle(sphere, x, y, vx, vy, color, radius, quote) {
        this.sphere = sphere;
        this.x = x || 0;
        this.y = y || 0;
        this.vx = vx || 1;
        this.vy = vy || 1;
        this.color = color || {
            h: 0,
            s: 0,
            l: 0,
            o: 1
        };
        this.radius = radius || 3;
        this.quote = quote || ""
    }



    Particle.prototype.move = function(distance) {
        this.make_sure_in_boundary();
        // if the particle is far away from the mouse then keep moving
        if (distance > 30) {
            this.x += this.vx;
            this.y += this.vy;    
        }
    };
    Particle.prototype.draw = function(distance) {
        var r;
        this.is_text = false;
        this.color.a = .2;
        this.draw_circle(this.x, this.y, this.radius, this.color);
        if (distance < 30) {
            this.color.a = .1;
            r = this.radius * 4;
            this.draw_text(this.quote);
            this.is_text = true
        } else {
            this.color.a = .05;
            r = this.radius * 3
        }
        return this.draw_circle(this.x, this.y, r, this.color)
    };
    Particle.prototype.make_sure_in_boundary = function() {
        if (this.x + this.radius > this.sphere.width || this.x - this.radius < 0) {
            this.vx = -this.vx
        }
        if (this.y + this.radius > this.sphere.height || this.y - this.radius < 0) {
            return this.vy = -this.vy
        }
    };
    Particle.prototype.draw_circle = function(x, y, r, color) {
        var ctx = this.sphere.context;
        ctx.fillStyle = this.sphere.hsla_str(color);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    };
    Particle.prototype.draw_text = function(text, x, y) {
        var label, pos, w;
        if (x == null) {
            x = this.sphere.mouse.sx + 20
        }
        if (y == null) {
            y = this.sphere.mouse.sy + 10
        }
        label = this.sphere.$label;
        pos = label.offset();
        if (Math.abs(pos.left - x) < 1 || Math.abs(pos.top - y) < 1) {
            return
        }
        w = label.width();
        if (w + x > this.sphere.width) {
            x -= w + 20
        }
        label.offset({
            left: x,
            top: y
        }).html(this.quote);
        return label.css({
            visibility: "visible"
        })
    };

    var sphere;
    var phrase = [
        "If you smile when no one is around, you really mean it.",
        "这世上，无聊的事情才是更有趣的嘛。",
        "广义的洗脑就是让你的意识依赖于某个标准答案，然后通过给你标准答案让你不会思考而控制你。",
        "“Be the change that you wish to see in the world.” - Mahatma Gandhi",
        "\"If you want to live a happy life, tie it to a goal, not to people or objects.\" - Albert Einstein",
        "Don't judge me. I was born to be true, not perfect.",
        "所谓的专家，就是在一个狭窄的领域内，犯过所有错误的人。",
        "He is not too old, but old enough to be lonely.",
        "\"Painting is easy when you don't know how, but very difficult when you do.\" - Edgar Degas",
        "I am a slow walker, but I never walk backwards.",
        "Every design tells a story.",
        "この世に奇跡なんてない。あるのは偶然と必然、そして誰が何をするかだけ。",
        "世上没有正义，只有孤独。 - 卫宫切嗣",
        "You were born an original, don't die a copy.",
        "\"We all die, the goal isn't to live forever. The goal is to create something that will.\" - Chuch Palahniuk",
        "人間は嘘をつく時には、必ず、まじめな顔をしているものである。",
        "You are not a psychopath, although you may be attracted to them.",
        "Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away.",
        "鱼跃此时海，花开彼岸天。",
        "我相信上帝是存在的，但他不关心我们。 --爱因斯坦",
        "\"Frankie liked to say that boxing is an unnatural act. That everything in boxing is backwards. Sometimes the best way to deliver a punch is step back… But if step back too far, you ain't fighting at all.\"",
        "Loneliness is better than fake friends.",
        "History remembers the battle and forgets the blood.",
        "违背人类本性的习惯，难以养成，且易于忘记。",
        "\"If you show someone their future, they have no future. If you take away the mystery, you take away the hope.” - Michael Jennings",
        "\"If you want to live a happy life, tie it to a goal, not to people or objects.\" - Albert Einstein",
        "A true friend sees the first tear, catches the second, and stops the third.",
        "Thank God people don't hear what I'm thinking.",
        "Everything in this world find peace, eventually.",
        "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.” - Albert Einstein",
        "Learn the rules, and then learn how you can break the rules to improve your drawing.",
        "「人唔作出犧牲就唔會得到任何收穫；如果想得到一樣野，就一定要付出對等嘅代價。呢點就是鍊金術嘅基本原則，等價交換。當時我地兩個，深信呢點就是世界嘅真理。」--愛德華·艾力克",
        "「一即是全，全即是一。」",
        "「みんな 変わっちまったんだ」",
        "俺 会いたかった、ずっと お前に会いたかった お前の名前、呼びたかった、お前に謝りたかった…、好きだって言いたかった。"
    ];
    window.ys = {};
    ys.words = phrase.map(function(el) {
        return el.replace("\n", "<br>")
    });
    ys.sphere = new Sphere;
    ys.sphere.animate();
