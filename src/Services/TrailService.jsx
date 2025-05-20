export const getFeatures = () => {
    return fetch(`http://localhost:8088/features`).then((res) => res.json())
}

export const getTrails = () => {
    return fetch(`http://localhost:8088/trails`).then((res) => res.json())
}

export const getTrailById = (trailId) => {
    return fetch(`http://localhost:8088/trails?id=${trailId}&expand=trail`)
        .then((res) => res.json())
        .then((trails) => trails[0])
}

export const getTrailFeatures = () => {
    return fetch(`http://localhost:8088/trailFeatures`).then((res) => res.json())
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

