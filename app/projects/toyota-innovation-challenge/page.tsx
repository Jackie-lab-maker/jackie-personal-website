"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { Tilt3D } from "@/components/motion/tilt-3d"

const REPO_URL = "https://github.com/HurayrahB/Toyota-Innovation-Challenge"
const COLLAB_URL = `${REPO_URL}/tree/whole-claude-4`
const STARTER_URL = "https://github.com/IdeasClinicUWaterloo/S26-toyota-innovation-challenge"

const COLLABORATORS = [
  { name: "Woojae Kim", login: "woojae-k" },
  { name: "Hurayrah Butt", login: "HurayrahB" },
  { name: "Jingkai (Jackie) Shao", login: "Jackie-lab-maker" },
]

const GALLERY_ITEMS = [
  {
    id: 1,
    src: "/images/toyota-innovation-challenge/workspace.jpg",
    alt: "Dobot Magician arm on a workbench with an overhead camera mounted above it",
    description: "The workspace: a Dobot Magician arm with an overhead depth camera.",
  },
  {
    id: 2,
    src: "/images/toyota-innovation-challenge/gripper-and-targets.jpg",
    alt: "Dobot Magician gripper next to red velcro tags and red 3D-printed brake calipers",
    description: "The gripper and its pick targets: red velcro tags and 3D-printed brake calipers.",
  },
  {
    id: 3,
    src: "/images/toyota-innovation-challenge/camera-mount.jpg",
    alt: "Camera mounted on a clamped articulated arm under a table",
    description: "The camera mount holding the vision system above the workspace.",
  },
]

const DEMO_VIDEOS = [
  {
    src: "/images/toyota-innovation-challenge/pick-and-place-demo.mp4",
    poster: "/images/toyota-innovation-challenge/pick-and-place-poster.jpg",
    caption: "Demo of object detection and pick-and-place: the camera detects the target items and the arm picks and places them.",
  },
  {
    src: "/images/toyota-innovation-challenge/demo.mp4",
    poster: "/images/toyota-innovation-challenge/demo-poster.jpg",
    caption: "Demo of gesture control: the operator directs the arm with hand gestures captured by the camera.",
  },
]

export default function ToyotaInnovationChallengePage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/projects"
            className="font-mono text-xs text-accent hover:text-foreground transition-colors inline-flex items-center gap-2 border border-border px-3 py-2 hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Navigate back to projects page"
            role="button"
          >
            <span aria-hidden="true">{"<"}</span>
            <span>Back to Projects</span>
          </Link>
        </div>
      </header>

      {/* Sponsor logo (native 268px width, so it is not stretched) */}
      <div className="w-full bg-black flex flex-col items-center py-10 gap-3">
        <div className="relative w-[268px] h-[102px]">
          <Image
            src="/images/toyota-innovation-challenge/tmmc-logo.png"
            alt="Toyota Motor Manufacturing Canada Inc. logo"
            fill
            className="object-contain"
            sizes="268px"
            priority
          />
        </div>
        <p className="font-mono text-[11px] text-white/60">Challenge sponsor</p>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <Reveal variant="blur-up">
          <div className="font-mono text-center mb-12">
            <div className="text-accent mb-4 flex flex-col items-center">
              <pre className="text-xs md:text-sm">╔══════════════════════════════════════════════════════════════╗</pre>
              <pre className="text-xs md:text-sm font-bold">║ COLLABORATIVE ROBOTIC ARM ║</pre>
              <pre className="text-xs md:text-sm">╚══════════════════════════════════════════════════════════════╝</pre>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              Completed — Toyota Innovation Challenge
            </h1>
            <p className="text-muted-foreground text-sm">
              University of Waterloo · Sponsored by Toyota Motor Manufacturing Canada · 3 days
            </p>
          </div>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.05}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_INFO</div>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                Built over three days for the Toyota Innovation Challenge, hosted at the University of
                Waterloo and sponsored by Toyota Motor Manufacturing Canada. The challenge: a robotic arm
                that works alongside a person instead of behind a cage.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} PROJECT_OVERVIEW</div>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                A vision-guided pick-and-place system for a Dobot Magician arm. A camera finds drop-zone
                plates and red target blocks, a homography maps camera pixels into the arm&rsquo;s coordinates,
                and a three-phase state machine runs the pick-and-place cycle. Targets must hold still for
                a run of frames before they&rsquo;re locked in, and the arm confirms arrival by polling its
                pose rather than waiting on fixed delays.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                Working alongside people is covered by two features described below: hand safety, and a
                gesture mode that lets a person drive the arm by hand.
              </p>
              <p className="text-accent pl-4 text-[11px] md:text-xs">
                Python · OpenCV · MediaPipe · Dobot Magician
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} GESTURE_CONTROL</div>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                Gesture control lets an operator drive the arm by hand from a distance instead of standing
                next to it. The intended application is hazardous areas of an automotive production line,
                such as a welding line, where a person can direct a robot arm without being in the work
                area.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                A camera tracks the hand with MediaPipe. An open palm makes the arm follow the hand&rsquo;s
                position, one finger raises it and two lower it, a fist opens or closes the gripper, and a
                thumbs-up sends it home. A gesture has to be held for about 18 frames before it fires, so a
                stray movement doesn&rsquo;t command the arm, and every command is clamped to safe workspace
                bounds.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                The second demo video below shows this gesture-control mode.
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-6 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} HAND_SAFETY</div>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                The challenge is a robot that works next to people, so MediaPipe hand detection protects
                the person in two ways, one in each mode.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                <span className="text-foreground">Collaborative pick-and-place: slow down.</span> A single
                Orbbec Astra camera watches the workspace, and MediaPipe Hands runs on every frame in
                every phase of the cycle: scanning for plates, scanning for red blocks, and waiting for the
                next pick. The moment a hand is visible, the arm&rsquo;s velocity and acceleration are cut to
                half of normal, and they return to normal as soon as the hand leaves the frame. This layer
                only changes the speed setting; it never moves the arm itself.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed mb-3">
                <span className="text-foreground">Gesture mode: hold.</span> The hand&rsquo;s wrist landmark is
                projected through the same homography into the arm&rsquo;s coordinates. If it lands inside the
                arm&rsquo;s table zone (X 150 to 310 mm, Y &minus;140 to 140 mm), the gesture is discarded and the
                arm holds its position, with a SAFETY HOLD banner on screen, so it never moves toward a hand
                that is already near it.
              </p>
              <p className="text-muted-foreground pl-4 leading-relaxed">
                The photo below is the live camera view in the second phase (scanning for red blocks) with a
                hand in frame: the hand skeleton is tracked, the on-screen readout shows HAND DETECTED and
                SPEED 50% SLOW, and target locking carries on at 35%.
              </p>
              <figure className="pl-4 mt-4 max-w-[480px]">
                <div className="relative aspect-[4/3] border border-border bg-black">
                  <Image
                    src="/images/toyota-innovation-challenge/hand-slowdown.jpg"
                    alt="Camera view with a tracked hand skeleton and an overlay reading Hand Detected and Speed 50% Slow"
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                </div>
                <figcaption className="mt-2 text-muted-foreground italic">
                  Hand detected in frame: the arm slows to 50% of its normal speed.
                </figcaption>
              </figure>
              <p className="text-muted-foreground pl-4 mt-4 leading-relaxed">
                As the repo&rsquo;s own safety notes say, this software override is an extra layer and not a
                substitute for the arm&rsquo;s safety training. The collaborative mode lives on the{" "}
                <a
                  href={COLLAB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-foreground underline"
                >
                  whole-claude-4 branch
                </a>
                .
              </p>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="tilt-up" delay={0.1}>
          <Tilt3D>
          <div className="border border-border bg-card p-6 mb-12 hover-lift">
            <div className="font-mono text-xs md:text-sm">
              <div className="text-accent mb-2">{">"} COLLABORATORS</div>
              <ul className="pl-4 space-y-1">
                {COLLABORATORS.map((c) => (
                  <li key={c.login} className="text-muted-foreground">
                    {c.name}{" "}
                    <a
                      href={`https://github.com/${c.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-foreground underline"
                    >
                      @{c.login}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground pl-4 mt-3 leading-relaxed">
                Contributors as listed on GitHub. Built on the University of Waterloo IdeasClinic{" "}
                <a
                  href={STARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-foreground underline"
                >
                  starter code
                </a>
                .
              </p>
              <div className="pl-4 mt-3">
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-xs text-accent hover:text-foreground transition-all duration-200 border border-border px-3 py-1 hover:bg-accent/10 hover:-translate-y-0.5 active:translate-y-0"
                >
                  [view source →]
                </a>
              </div>
            </div>
          </div>
          </Tilt3D>
          </Reveal>

          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ DEMO VIDEOS ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {DEMO_VIDEOS.map((video) => (
              <StaggerItem key={video.src} variant="tilt-up" className="border border-border bg-card overflow-hidden">
                <video
                  className="w-full aspect-video bg-black"
                  controls
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="p-4 font-mono text-xs md:text-sm text-muted-foreground italic">{video.caption}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="blur-up">
          <div className="font-mono text-accent mb-6 flex flex-col items-center">
            <pre className="text-xs md:text-sm">╔════════════════════════════════════════════════╗</pre>
            <pre className="text-xs md:text-sm font-bold">║ PHOTO GALLERY ║</pre>
            <pre className="text-xs md:text-sm">╚════════════════════════════════════════════════╝</pre>
          </div>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <Tilt3D key={item.id} maxTilt={3}>
              <StaggerItem
                variant="swing-in"
                className="border border-border bg-card hover:border-accent transition-colors duration-300 overflow-hidden group hover-lift"
              >
                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="font-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1">
                      [click to enlarge]
                    </span>
                  </div>
                </div>
                <div className="p-4 font-mono text-xs md:text-sm">
                  <div className="text-accent mb-2">{">"} IMAGE_{item.id.toString().padStart(2, "0")}</div>
                  <p className="text-muted-foreground pl-4 italic">{item.description}</p>
                </div>
              </StaggerItem>
              </Tilt3D>
            ))}
          </Stagger>
        </div>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="absolute top-4 right-4 font-mono text-white hover:text-accent transition-colors text-sm"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            [close]
          </button>
          <motion.div
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotateX: 5, transformPerspective: 1200 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0, transformPerspective: 1200 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.src || ""}
              alt={GALLERY_ITEMS.find((item) => item.id === selectedImage)?.alt || ""}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      )}
    </main>
  )
}
