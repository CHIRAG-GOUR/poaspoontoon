import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

/* Shared positions array so kids can "see" each other */
const kidPositions: THREE.Vector3[] = Array.from({ length: 6 }, () => new THREE.Vector3());

/* ── Stylized Kid figure from basic shapes ── */
function Kid({
    kidIndex,
    position,
    bodyColor,
    hairColor,
    animOffset,
    mouseTarget
}: {
    kidIndex: number;
    position: [number, number, number];
    bodyColor: string;
    hairColor: string;
    animOffset: number;
    mouseTarget: React.RefObject<THREE.Vector3 | null>;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);
    const leftLegRef = useRef<THREE.Mesh>(null);
    const rightLegRef = useRef<THREE.Mesh>(null);
    const currentX = useRef(position[0]);
    const currentZ = useRef(position[2]);
    // Each kid has a "buddy" they occasionally chase/tag
    const buddyIndex = (kidIndex + 1) % 6;
    const playTimer = useRef(0);
    const playMode = useRef<'cursor' | 'buddy'>('cursor');

    useFrame((state, delta) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime() + animOffset;

        // Update this kid's shared position
        kidPositions[kidIndex].set(currentX.current, 0, currentZ.current);

        // Toggle play mode: sometimes chase buddy instead of cursor
        playTimer.current += delta;
        if (playTimer.current > 4 + animOffset * 0.7) {
            playTimer.current = 0;
            playMode.current = playMode.current === 'cursor' ? 'buddy' : 'cursor';
        }

        let targetX: number, targetZ: number;
        const angle = animOffset * (Math.PI * 2 / 6);
        const radius = 2.2 + animOffset * 0.35;

        if (playMode.current === 'buddy') {
            // Chase the buddy kid, offset slightly so they don't stack
            const buddy = kidPositions[buddyIndex];
            targetX = buddy.x + Math.cos(angle) * 1.2;
            targetZ = buddy.z + Math.sin(angle) * 1.2;
        } else if (mouseTarget.current) {
            targetX = mouseTarget.current.x + Math.cos(angle) * radius;
            targetZ = mouseTarget.current.z + Math.sin(angle) * radius;
        } else {
            targetX = position[0];
            targetZ = position[2];
        }

        const speed = 1.4 + animOffset * 0.1;
        currentX.current += (targetX - currentX.current) * delta * speed;
        currentZ.current += (targetZ - currentZ.current) * delta * speed;

        groupRef.current.position.x = currentX.current;
        groupRef.current.position.z = currentZ.current;

        // Face movement direction
        const dx = targetX - currentX.current;
        const dz = targetZ - currentZ.current;
        if (Math.abs(dx) > 0.05 || Math.abs(dz) > 0.05) {
            groupRef.current.rotation.y = Math.atan2(dx, dz);
        }

        const dist = Math.sqrt(dx * dx + dz * dz);
        const isNear = dist < 1.5; // close to target — reaching/grab mode

        // Running legs
        const runSpeed = isNear ? 2 : 6;
        const runAmp = isNear ? 0.1 : 0.6;
        groupRef.current.position.y = Math.abs(Math.sin(t * runSpeed)) * (isNear ? 0.05 : 0.35);
        if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(t * runSpeed) * runAmp;
        if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(t * runSpeed + Math.PI) * runAmp;

        // Arms: reach/grab when near target (both arms stretch forward), run swing otherwise
        if (leftArmRef.current && rightArmRef.current) {
            if (isNear) {
                // Both arms reach forward and wiggle — grabbing gesture
                leftArmRef.current.rotation.x = -1.0 + Math.sin(t * 8) * 0.3;
                rightArmRef.current.rotation.x = -1.0 + Math.sin(t * 8 + 0.5) * 0.3;
                leftArmRef.current.rotation.z = -0.2 + Math.sin(t * 6) * 0.15;
                rightArmRef.current.rotation.z = 0.2 - Math.sin(t * 6) * 0.15;
            } else {
                leftArmRef.current.rotation.x = Math.sin(t * runSpeed + Math.PI) * 0.5;
                rightArmRef.current.rotation.x = Math.sin(t * runSpeed) * 0.5;
                leftArmRef.current.rotation.z = 0;
                rightArmRef.current.rotation.z = 0;
            }
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Head */}
            <mesh castShadow position={[0, 2.2, 0]}>
                <sphereGeometry args={[0.55, 16, 16]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            {/* Hair */}
            <mesh castShadow position={[0, 2.5, 0]}>
                <sphereGeometry args={[0.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color={hairColor} roughness={0.8} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.18, 2.25, 0.45]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            <mesh position={[0.18, 2.25, 0.45]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            {/* Smile */}
            <mesh position={[0, 2.08, 0.48]} rotation={[0.2, 0, 0]}>
                <torusGeometry args={[0.12, 0.03, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Body / Shirt */}
            <mesh castShadow position={[0, 1.3, 0]}>
                <capsuleGeometry args={[0.4, 0.8, 8, 16]} />
                <meshStandardMaterial color={bodyColor} roughness={0.5} />
            </mesh>
            {/* Left Arm */}
            <mesh ref={leftArmRef} castShadow position={[-0.55, 1.5, 0]}>
                <capsuleGeometry args={[0.12, 0.7, 6, 12]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            {/* Right Arm */}
            <mesh ref={rightArmRef} castShadow position={[0.55, 1.5, 0]}>
                <capsuleGeometry args={[0.12, 0.7, 6, 12]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            {/* Left Leg */}
            <mesh ref={leftLegRef} castShadow position={[-0.2, 0.4, 0]}>
                <capsuleGeometry args={[0.14, 0.7, 6, 12]} />
                <meshStandardMaterial color="#3B82F6" roughness={0.6} />
            </mesh>
            {/* Right Leg */}
            <mesh ref={rightLegRef} castShadow position={[0.2, 0.4, 0]}>
                <capsuleGeometry args={[0.14, 0.7, 6, 12]} />
                <meshStandardMaterial color="#3B82F6" roughness={0.6} />
            </mesh>
            {/* Shoes */}
            <mesh castShadow position={[-0.2, 0, 0.1]}>
                <boxGeometry args={[0.22, 0.15, 0.35]} />
                <meshStandardMaterial color="#ef4444" roughness={0.5} />
            </mesh>
            <mesh castShadow position={[0.2, 0, 0.1]}>
                <boxGeometry args={[0.22, 0.15, 0.35]} />
                <meshStandardMaterial color="#ef4444" roughness={0.5} />
            </mesh>
        </group>
    );
}

/* ── Kid on Swing (attached to swing seat, swings with it) ── */
function SwingKid() {
    const kidRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Mesh>(null);
    const rightArmRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const swingAngle = Math.sin(t * 2) * 0.4;
        // Arms up when swinging forward, down when back
        if (leftArmRef.current) leftArmRef.current.rotation.x = -swingAngle * 0.8 - 1.0;
        if (rightArmRef.current) rightArmRef.current.rotation.x = -swingAngle * 0.8 - 1.0;
    });

    // Positioned at the seat of the swing (seat is at [0, -3, 0] relative to swing group pivot at [0, 4.8, 0])
    // The kid sits on seat — position relative to seat center
    return (
        <group ref={kidRef} position={[0, -3, 0]}>
            {/* Head */}
            <mesh castShadow position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.42, 12, 12]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            {/* Hair */}
            <mesh castShadow position={[0, 1.88, 0]}>
                <sphereGeometry args={[0.38, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#d97706" roughness={0.8} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.14, 1.64, 0.35]}>
                <sphereGeometry args={[0.065, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            <mesh position={[0.14, 1.64, 0.35]}>
                <sphereGeometry args={[0.065, 8, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            {/* Happy mouth - open O shape for wheee */}
            <mesh position={[0, 1.5, 0.37]}>
                <torusGeometry args={[0.07, 0.025, 6, 10, Math.PI * 2]} />
                <meshStandardMaterial color="#ef4444" />
            </mesh>
            {/* Body */}
            <mesh castShadow position={[0, 0.9, 0]}>
                <capsuleGeometry args={[0.3, 0.55, 6, 12]} />
                <meshStandardMaterial color="#f97316" roughness={0.5} />
            </mesh>
            {/* Arms gripping ropes */}
            <mesh ref={leftArmRef} castShadow position={[-0.32, 1.1, 0]} rotation={[-1.0, 0, 0.15]}>
                <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            <mesh ref={rightArmRef} castShadow position={[0.32, 1.1, 0]} rotation={[-1.0, 0, -0.15]}>
                <capsuleGeometry args={[0.09, 0.55, 4, 8]} />
                <meshStandardMaterial color="#FDDCB5" roughness={0.7} />
            </mesh>
            {/* Legs dangling */}
            <mesh castShadow position={[-0.15, 0.25, 0.2]}>
                <capsuleGeometry args={[0.1, 0.55, 4, 8]} />
                <meshStandardMaterial color="#3B82F6" roughness={0.6} />
            </mesh>
            <mesh castShadow position={[0.15, 0.25, 0.2]}>
                <capsuleGeometry args={[0.1, 0.55, 4, 8]} />
                <meshStandardMaterial color="#3B82F6" roughness={0.6} />
            </mesh>
            {/* Shoes */}
            <mesh castShadow position={[-0.15, -0.1, 0.35]}>
                <boxGeometry args={[0.18, 0.12, 0.28]} />
                <meshStandardMaterial color="#ef4444" roughness={0.5} />
            </mesh>
            <mesh castShadow position={[0.15, -0.1, 0.35]}>
                <boxGeometry args={[0.18, 0.12, 0.28]} />
                <meshStandardMaterial color="#ef4444" roughness={0.5} />
            </mesh>
        </group>
    );
}

/* ── Tree ── */
function Tree({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <mesh castShadow position={[0, 1.5, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
                <meshStandardMaterial color="#78350f" roughness={0.9} />
            </mesh>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh castShadow position={[0, 3.5, 0]}>
                    <dodecahedronGeometry args={[2]} />
                    <meshStandardMaterial color="#22c55e" roughness={0.8} />
                </mesh>
            </Float>
        </group>
    );
}

/* ── Flower ── */
function Flower({ position, color }: { position: [number, number, number]; color: string }) {
    const ref = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.5 + position[0]) * 0.1;
        }
    });
    return (
        <group ref={ref} position={position}>
            {/* Stem */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
                <meshStandardMaterial color="#16a34a" />
            </mesh>
            {/* Petals */}
            {[0, 1, 2, 3, 4].map((i) => (
                <mesh key={i} position={[Math.cos(i * Math.PI * 0.4) * 0.2, 0.85, Math.sin(i * Math.PI * 0.4) * 0.2]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color={color} roughness={0.5} />
                </mesh>
            ))}
            {/* Center */}
            <mesh position={[0, 0.85, 0]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" />
            </mesh>
        </group>
    );
}

/* ── Swing Set ── */
function SwingSet({ position }: { position: [number, number, number] }) {
    const seatRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (seatRef.current) {
            seatRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 2) * 0.4;
        }
    });

    return (
        <group position={position}>
            {/* Frame - A-shape */}
            <mesh castShadow position={[-1.5, 2.5, 0]} rotation={[0, 0, 0.15]}>
                <cylinderGeometry args={[0.1, 0.1, 5, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh castShadow position={[1.5, 2.5, 0]} rotation={[0, 0, -0.15]}>
                <cylinderGeometry args={[0.1, 0.1, 5, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Top bar */}
            <mesh castShadow position={[0, 4.8, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.12, 0.12, 3.5, 8]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Swinging seat + ropes */}
            <group ref={seatRef} position={[0, 4.8, 0]}>
                {/* Ropes */}
                <mesh position={[-0.3, -1.5, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 3, 4]} />
                    <meshStandardMaterial color="#92400E" />
                </mesh>
                <mesh position={[0.3, -1.5, 0]}>
                    <cylinderGeometry args={[0.03, 0.03, 3, 4]} />
                    <meshStandardMaterial color="#92400E" />
                </mesh>
                {/* Seat */}
                <mesh castShadow position={[0, -3, 0]}>
                    <boxGeometry args={[0.8, 0.1, 0.4]} />
                    <meshStandardMaterial color="#ef4444" roughness={0.4} />
                </mesh>
                {/* Kid sitting on swing */}
                <SwingKid />
            </group>
        </group>
    );
}

/* ── Proper Playground Slide ── */
function Slide({ position }: { position: [number, number, number] }) {
    // Platform at y=5. Slide descends from (0,5,0) to (3.8,0,0) in local space.
    const PH = 5;           // platform height
    const RUN = 3.8;        // horizontal run of the slide
    const SL = Math.sqrt(PH * PH + RUN * RUN);   // slide length ≈ 6.28
    const SA = Math.atan2(PH, RUN);               // slide angle ≈ 0.922 rad

    return (
        <group position={position}>
            {/* === Two main support posts (z sides) === */}
            <mesh castShadow position={[0, PH / 2, -0.55]}>
                <cylinderGeometry args={[0.12, 0.14, PH, 8]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh castShadow position={[0, PH / 2, 0.55]}>
                <cylinderGeometry args={[0.12, 0.14, PH, 8]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Cross brace at top */}
            <mesh castShadow position={[0, PH, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 1.2, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.6} roughness={0.3} />
            </mesh>

            {/* === Platform floor === */}
            <mesh castShadow position={[0, PH + 0.08, 0]}>
                <boxGeometry args={[1.4, 0.14, 1.2]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Platform back safety rail (3 sides) */}
            <mesh castShadow position={[-0.65, PH + 0.85, -0.6]}>
                <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
            </mesh>
            <mesh castShadow position={[0.65, PH + 0.85, -0.6]}>
                <cylinderGeometry args={[0.05, 0.05, 1.5, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
            </mesh>
            <mesh castShadow position={[0, PH + 1.5, -0.6]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.04, 0.04, 1.45, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
            </mesh>
            {/* Side rails */}
            <mesh castShadow position={[-0.69, PH + 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 1.28, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
            </mesh>
            <mesh castShadow position={[0.69, PH + 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 1.28, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} />
            </mesh>

            {/* === Ladder on the back (+Z) side === */}
            <mesh castShadow position={[-0.35, PH / 2, 0.95]}>
                <cylinderGeometry args={[0.07, 0.07, PH + 0.2, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} roughness={0.4} />
            </mesh>
            <mesh castShadow position={[0.35, PH / 2, 0.95]}>
                <cylinderGeometry args={[0.07, 0.07, PH + 0.2, 6]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.5} roughness={0.4} />
            </mesh>
            {/* Rungs */}
            {[0.5, 1.2, 1.9, 2.6, 3.3, 4.0, 4.7].map((y, i) => (
                <mesh key={i} castShadow position={[0, y, 0.95]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.78, 6]} />
                    <meshStandardMaterial color="#D1D5DB" metalness={0.5} />
                </mesh>
            ))}

            {/* === Slide chute — grouped so walls align automatically === */}
            {/* Center of slide: (RUN/2, PH/2) = (1.9, 2.5) ; rotate by -SA around Z */}
            <group position={[RUN / 2, PH / 2, 0]} rotation={[0, 0, -SA]}>
                {/* Slide surface */}
                <mesh castShadow>
                    <boxGeometry args={[SL, 0.1, 1.1]} />
                    <meshStandardMaterial color="#FBBF24" metalness={0.1} roughness={0.22} />
                </mesh>
                {/* Left guard wall */}
                <mesh castShadow position={[0, 0.3, 0.62]}>
                    <boxGeometry args={[SL, 0.52, 0.09]} />
                    <meshStandardMaterial color="#F59E0B" roughness={0.4} />
                </mesh>
                {/* Right guard wall */}
                <mesh castShadow position={[0, 0.3, -0.62]}>
                    <boxGeometry args={[SL, 0.52, 0.09]} />
                    <meshStandardMaterial color="#F59E0B" roughness={0.4} />
                </mesh>
            </group>

            {/* Landing mat at bottom */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[RUN + 0.5, 0.02, 0]}>
                <planeGeometry args={[1.4, 1.2]} />
                <meshStandardMaterial color="#fde68a" roughness={0.9} />
            </mesh>
        </group>
    );
}

/* ── Butterfly ── */
function Butterfly({ offset }: { offset: number }) {
    const ref = useRef<THREE.Group>(null);
    const wingLRef = useRef<THREE.Mesh>(null);
    const wingRRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.getElapsedTime() + offset;
        ref.current.position.x = Math.sin(t * 0.5) * 8 + offset * 3;
        ref.current.position.y = 4 + Math.sin(t * 1.2) * 2;
        ref.current.position.z = Math.cos(t * 0.3) * 6;
        ref.current.rotation.y = Math.atan2(Math.cos(t * 0.5), -Math.sin(t * 0.3)) + Math.PI;
        if (wingLRef.current) wingLRef.current.rotation.y = Math.sin(t * 10) * 0.8;
        if (wingRRef.current) wingRRef.current.rotation.y = -Math.sin(t * 10) * 0.8;
    });

    const wingColor = ['#ec4899', '#a855f7', '#f97316', '#3b82f6'][Math.floor(offset) % 4];

    return (
        <group ref={ref}>
            {/* Body */}
            <mesh>
                <capsuleGeometry args={[0.04, 0.25, 4, 8]} />
                <meshStandardMaterial color="#1f2937" />
            </mesh>
            {/* Left wing */}
            <mesh ref={wingLRef} position={[-0.15, 0.05, 0]}>
                <planeGeometry args={[0.35, 0.25]} />
                <meshStandardMaterial color={wingColor} side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
            {/* Right wing */}
            <mesh ref={wingRRef} position={[0.15, 0.05, 0]}>
                <planeGeometry args={[0.35, 0.25]} />
                <meshStandardMaterial color={wingColor} side={THREE.DoubleSide} transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

/* ── Ground ── */
function Garden({ mouseTarget }: { mouseTarget: React.RefObject<THREE.Vector3 | null> }) {
    return (
        <group>
            {/* Main grass ground */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[80, 80]} />
                <meshStandardMaterial color="#86efac" roughness={0.9} />
            </mesh>
            {/* Path */}
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 5]}>
                <planeGeometry args={[3, 20]} />
                <meshStandardMaterial color="#fde68a" roughness={0.95} />
            </mesh>

            {/* Trees */}
            <Tree position={[-10, 0, -8]} />
            <Tree position={[12, 0, -6]} />
            <Tree position={[-8, 0, 8]} />
            <Tree position={[10, 0, 10]} />
            <Tree position={[0, 0, -14]} />
            <Tree position={[-15, 0, 0]} />

            {/* Flowers scattered */}
            <Flower position={[-3, 0, 3]} color="#ec4899" />
            <Flower position={[4, 0, 2]} color="#a855f7" />
            <Flower position={[-5, 0, -3]} color="#f97316" />
            <Flower position={[6, 0, -2]} color="#ec4899" />
            <Flower position={[2, 0, 6]} color="#3b82f6" />
            <Flower position={[-2, 0, -5]} color="#f43f5e" />
            <Flower position={[7, 0, 5]} color="#a855f7" />
            <Flower position={[-6, 0, 6]} color="#f97316" />

            {/* Playground Equipment */}
            <SwingSet position={[-5, 0, -1]} />
            <Slide position={[5, 0, -3]} />

            {/* Kids — chase cursor and tag each other */}
            <Kid kidIndex={0} position={[-5, 0, -1]} bodyColor="#ef4444" hairColor="#92400E" animOffset={0} mouseTarget={mouseTarget} />
            <Kid kidIndex={1} position={[2, 0, 1]} bodyColor="#3b82f6" hairColor="#1f2937" animOffset={1} mouseTarget={mouseTarget} />
            <Kid kidIndex={2} position={[-2, 0, 4]} bodyColor="#a855f7" hairColor="#fbbf24" animOffset={2} mouseTarget={mouseTarget} />
            <Kid kidIndex={3} position={[6, 0, 2]} bodyColor="#f97316" hairColor="#78350f" animOffset={3} mouseTarget={mouseTarget} />
            <Kid kidIndex={4} position={[-7, 0, 5]} bodyColor="#10b981" hairColor="#1f2937" animOffset={4} mouseTarget={mouseTarget} />
            <Kid kidIndex={5} position={[4, 0, 7]} bodyColor="#ec4899" hairColor="#92400E" animOffset={5} mouseTarget={mouseTarget} />
        </group>
    );
}

/* ── Scene with mouse-interactive camera ── */
function SceneContent() {
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const targetPosition = useRef(new THREE.Vector3(18, 16, 18));
    const mouse = useRef({ x: 0, y: 0 });
    const mouseGroundPos = useRef<THREE.Vector3 | null>(new THREE.Vector3(0, 0, 0));
    const raycaster = useRef(new THREE.Raycaster());
    const groundPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));

    const butterflies = useMemo(() => [0, 1.5, 3, 4.5], []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((_, delta) => {
        if (cameraRef.current) {
            const panX = mouse.current.x * 6;
            const panZ = -mouse.current.y * 6;
            targetPosition.current.set(18 + panX, 16, 18 + panZ);
            cameraRef.current.position.lerp(targetPosition.current, delta * 3);
            cameraRef.current.lookAt(0, 1, 0);

            // Raycast mouse onto ground plane for kids to chase
            raycaster.current.setFromCamera(
                new THREE.Vector2(mouse.current.x, mouse.current.y),
                cameraRef.current
            );
            const hit = new THREE.Vector3();
            raycaster.current.ray.intersectPlane(groundPlane.current, hit);
            if (hit && mouseGroundPos.current) {
                mouseGroundPos.current.copy(hit);
            }
        }
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef as any} makeDefault position={[18, 16, 18]} fov={38} />
            <color attach="background" args={['#dcfce7']} />
            <fog attach="fog" args={['#dcfce7', 25, 60]} />

            <ambientLight intensity={1.4} />
            <directionalLight
                castShadow
                position={[15, 25, 10]}
                intensity={1.8}
                shadow-mapSize={[2048, 2048]}
                shadow-camera-near={0.5}
                shadow-camera-far={80}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
            />
            <hemisphereLight args={['#87ceeb', '#86efac', 0.6]} />

            <Garden mouseTarget={mouseGroundPos} />

            {butterflies.map((offset, idx) => (
                <Butterfly key={idx} offset={offset} />
            ))}

            <ContactShadows position={[0, -0.01, 0]} opacity={0.5} scale={50} blur={2.5} far={6} />
            <Environment preset="park" />
        </>
    );
}

export default function Scene3D() {
    return (
        <Canvas shadows className="pointer-events-none">
            <SceneContent />
        </Canvas>
    );
}
