
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			 fontFamily: {
				anton: ['Anton', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom vibrant colors for signage theme
				neon: {
					yellow: '#FFD700',
					orange: '#FF6B35',
					red: '#FF2D92',
					pink: '#FF69B4',
					purple: '#8A2BE2',
					cyan: '#00FFFF',
					green: '#39FF14'
				}
			},
			backgroundImage: {
				'fire-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF2D92 100%)',
				'neon-gradient': 'linear-gradient(135deg, #FF69B4 0%, #8A2BE2 50%, #00FFFF 100%)',
				'sunset-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FFD700 100%)',
				'electric-gradient': 'linear-gradient(135deg, #FF2D92 0%, #8A2BE2 50%, #00FFFF 100%)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				   marquee: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' },
					},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						textShadow: '0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor'
					},
					'50%': {
						textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(255, 107, 53, 0.6)',
						transform: 'scale(1.05)'
					}
				},
				'ring': {
					'0%, 100%': {
						transform: 'rotate(0deg) scale(1)'
					},
					'10%, 30%': {
						transform: 'rotate(-10deg) scale(1.05)'
					},
					'20%, 40%': {
						transform: 'rotate(10deg) scale(1.1)'
					},
					'50%': {
						transform: 'rotate(0deg) scale(1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'marquee': 'marquee 10s linear infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
