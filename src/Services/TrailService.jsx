export const getFeatures = () => {
    return fetch(`https://park-hike-planner.onrender.com/features`).then((res) => res.json())
}

export const getTrails = () => {
    return fetch(`https://park-hike-planner.onrender.com/trails`).then((res) => res.json())
}

export const getTrailById = (trailId) => {
    return fetch(`https://park-hike-planner.onrender.com/trails?id=${trailId}&expand=trail`)
        .then((res) => res.json())
        .then((trails) => trails[0])
}

export const getTrailFeatures = () => {
    return fetch(`https://park-hike-planner.onrender.com/trailFeatures`).then((res) => res.json())
}

export const getTrailsWithFeatures = () => {
    return getTrails().then((trails) => {
        return getTrailFeatures().then((trailFeatures) => {
            const featureMap = {}

            trailFeatures.forEach(({ trailId, featureId }) => {
                if (!featureMap[trailId]) {
                    featureMap[trailId] = []
                }
                featureMap[trailId].push(featureId)
            })

            const trailsWithFeatures = trails.map((trail) => ({
                ...trail,
                features: featureMap[trail.id] || []
            }))

            return trailsWithFeatures
        })
    })
}

